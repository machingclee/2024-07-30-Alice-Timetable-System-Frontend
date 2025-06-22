import {
    createAsyncThunk,
    createListenerMiddleware,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import registerDialogAndActions from '../../utils/registerEffects';
import { loadingActions } from '../../utils/loadingActions';
import apiClient from '../../axios/apiClient';
import { CustomResponse } from '../../axios/responseTypes';
import apiRoutes from '../../axios/apiRoutes';
import { processRes } from '../../utils/processRes';
import {
    Competition,
    CreateUserRequest,
    MultipleChoiceOption,
    MultipleChoiceQuestion,
    Question,
    SingleChoiceOption,
    UserDTO,
} from '../../dto/dto';
import normalizeUtil from '../../utils/normalizeUtil';
import lodash, { debounce } from 'lodash';
import tokenUtil from '../../utils/tokenUtil';

export type competitionSliceState = {
    competitions: {
        ids?: string[];
        idToObject?: {
            [key: string]: Competition;
        };
    };
};

const initialState: competitionSliceState = {
    competitions: {
        ids: [],
        idToObject: {},
    },
};

const competitionSlice = createSlice({
    name: 'competition',
    initialState,
    reducers: {
        addCompetition: (
            state,
            action: PayloadAction<{ id: string; competition: Competition }>
        ) => {
            const { id, competition } = action.payload;
            if (!state.competitions.ids?.includes(id)) {
                state.competitions.ids?.push(id);
            }
            if (state.competitions.idToObject) {
                state.competitions.idToObject[id] = competition;
            }
        },
        addQuestion: (
            state,
            action: PayloadAction<{ competitionId: string; question: Question }>
        ) => {
            const { competitionId, question } = action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            if (competition) {
                competition.IdToQuestion[question.questionId] = question;
                competition.questionIds.push(question.questionId);
                if (question.type === 'MultipleChoiceQuestion') {
                    const firstOption = {
                        id: tokenUtil.generateRandomHexString(),
                        option: 'Option ' + 1,
                        chosen: false,
                    } as MultipleChoiceOption;
                    const secondOption = {
                        id: tokenUtil.generateRandomHexString(),
                        option: 'Option ' + 2,
                        chosen: false,
                    } as MultipleChoiceOption;
                    const ids = [firstOption.id, secondOption.id];
                    const optionIdToOption = {
                        [firstOption.id]: firstOption,
                        [secondOption.id]: secondOption,
                    };

                    competition.IdToQuestion[question.questionId] = {
                        ...question,
                        optionIds: ids,
                        optionIdToOption: optionIdToOption,
                    };
                    return;
                } else if (question.type === 'SingleChoiceQuestion') {
                    const firstOption = {
                        id: tokenUtil.generateRandomHexString(),
                        option: 'Option ' + 1,
                        chosen: false,
                    } as SingleChoiceOption;
                    const secondOption = {
                        id: tokenUtil.generateRandomHexString(),
                        option: 'Option ' + 2,
                        chosen: false,
                    } as SingleChoiceOption;
                    const ids = [firstOption.id, secondOption.id];
                    const optionIdToOption = {
                        [firstOption.id]: firstOption,
                        [secondOption.id]: secondOption,
                    };
                    competition.IdToQuestion[question.questionId] = {
                        ...question,
                        optionIds: ids,
                        optionIdToOption: optionIdToOption,
                    };
                    return;
                } else {
                    competition.IdToQuestion[question.questionId] = {
                        ...question,
                        question: 'Short Question to Ask',
                        response: '',
                    };
                }
            }
        },
        addOption: (
            state,
            action: PayloadAction<{
                competitionId: string;
                questionId: string;
                optionId: string;
                optionText: string;
            }>
        ) => {
            const { competitionId, questionId, optionId, optionText } =
                action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            if (competition) {
                const question = competition.IdToQuestion[questionId];
                // Ensure the question is of type "MultipleChoiceQuestion"
                switch (question.type) {
                    case 'MultipleChoiceQuestion':
                        // Create a new option with the appropriate index
                        const newMultipleChoiceOption = {
                            id: optionId,
                            option: optionText,
                            chosen: false,
                        };
                        // Push a new Id to ids
                        question.optionIds.push(newMultipleChoiceOption.id);
                        // Push a new object to [id]
                        question.optionIdToOption[newMultipleChoiceOption.id] =
                            newMultipleChoiceOption;
                        return;
                    case 'SingleChoiceQuestion':
                        const newSingleChoiceOption = {
                            id: optionId, // New option index is the current length of the options array
                            option: optionText,
                            chosen: false,
                        };

                        // Push a new Id to ids
                        question.optionIds.push(newSingleChoiceOption.id);
                        // Push a new object to [id]
                        question.optionIdToOption[newSingleChoiceOption.id] =
                            newSingleChoiceOption;
                        return;
                }
            }
        },
        updateCompetition: (
            state,
            action: PayloadAction<{
                competitionId: string;
                competition: Competition;
            }>
        ) => {
            const { competitionId, competition } = action.payload;
            if (
                state.competitions.idToObject &&
                state.competitions.idToObject[competitionId]
            ) {
                state.competitions.idToObject[competitionId] = competition;
            }
        },
        updateQuestion: (
            state,
            action: PayloadAction<{
                competitionId: string;
                questionId: string;
                question: Question;
            }>
        ) => {
            const { competitionId, questionId, question } = action.payload;
            if (
                state.competitions.idToObject?.[competitionId] &&
                state.competitions.idToObject[competitionId].IdToQuestion[
                    questionId
                ]
            ) {
                state.competitions.idToObject[competitionId].IdToQuestion[
                    questionId
                ] = question;
            }
        },
        changeQuestionCompulsoryStatusToTheOpposite: (
            state,
            action: PayloadAction<{ competitionId: string; questionId: string }>
        ) => {
            const { competitionId, questionId } = action.payload;
            if (
                state.competitions.idToObject?.[competitionId] &&
                state.competitions.idToObject[competitionId].IdToQuestion[
                    questionId
                ]
            ) {
                const competition =
                    state.competitions.idToObject?.[competitionId];
                const question = competition?.IdToQuestion?.[questionId];
                if (question) {
                    question.compulsory = !question.compulsory;
                }
            }
        },
        updateQuestionOrder: (state, action) => {
            const { competitionId, questionIds } = action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            if (competition) {
                competition.questionIds = questionIds; // Update the order of questions
            }
        },
        deleteQuestion: (
            state,
            action: PayloadAction<{ competitionId: string; questionId: string }>
        ) => {
            const { competitionId, questionId } = action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            if (competition && competition.IdToQuestion?.[questionId]) {
                competition.questionIds = competition.questionIds.filter(
                    id => id !== questionId
                );
                delete competition.IdToQuestion[questionId];
            }
        },
        deleteOption: (
            state,
            action: PayloadAction<{
                competitionId: string;
                questionId: string;
                optionId: string;
            }>
        ) => {
            const { competitionId, questionId, optionId } = action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            const question = competition?.IdToQuestion?.[questionId];
            if (competition && question) {
                switch (question.type) {
                    case 'MultipleChoiceQuestion':
                        // Clone the question options to avoid mutating the state directly
                        question.optionIds = question.optionIds.filter(
                            id => id !== optionId
                        );
                        delete question.optionIdToOption[optionId];
                        return;
                    case 'SingleChoiceQuestion':
                        // Clone the question options to avoid mutating the state directly
                        question.optionIds = question.optionIds.filter(
                            id => id !== optionId
                        );
                        delete question.optionIdToOption[optionId];
                        return;
                }
            }
        },
    },
    extraReducers: builder => {},
});

export class UserThunkAction {
    public static createUser = createAsyncThunk(
        'userSlice/createUser',
        async (props: CreateUserRequest, api) => {
            const res = await apiClient.post<CustomResponse<undefined>>(
                apiRoutes.POST_CREATE_USER,
                props
            );
            return processRes(res, api);
        }
    );
}

export const competitionMiddleware = createListenerMiddleware();
registerDialogAndActions(competitionMiddleware, [
    ...loadingActions(UserThunkAction.createUser),
    {
        // rejections: [UserThunkAction.createUser.rejected, UserThunkAction.updateUser.rejected],
    },
]);

export default competitionSlice;
