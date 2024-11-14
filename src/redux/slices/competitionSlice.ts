import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import registerDialogAndActions from "../../utils/registerEffects";
import { loadingActions } from "../../utils/loadingActions";
import apiClient from "../../axios/apiClient";
import { CustomResponse } from "../../axios/responseTypes";
import apiRoutes from "../../axios/apiRoutes";
import { processRes } from "../../utils/processRes";
import { Competition, CreateUserRequest, MultipleChoiceOption, MultipleChoiceQuestion, Question, SingleChoiceOption, User } from "../../dto/dto";
import normalizeUtil from "../../utils/normalizeUtil";
import lodash, { debounce } from "lodash";

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
    name: "competition",
    initialState,
    reducers: {
        addCompetition: (state, action: PayloadAction<{ id: string; competition: Competition }>) => {
            const { id, competition } = action.payload;
            // Add the competition ID if it doesn't exist
            if (!state.competitions.ids?.includes(id)) {
                console.log("Hi!");
                state.competitions.ids?.push(id);
            }

            // Add or update the competition in the idToObject map
            if (state.competitions.idToObject) {
                console.log("Hi!");
                state.competitions.idToObject[id] = competition;
            }
        },
        addQuestion: (state, action: PayloadAction<{ competitionId: string; question: Question }>) => {
            const { competitionId, question } = action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            console.log("competitionId:", competitionId);
            console.log("competition:", competition);
            if (competition) {
                competition.IdToQuestion[question.questionId] = question;
                competition.questionIds.push(question.questionId);
                if (question.type === "MultipleChoiceQuestion") {
                    console.log("Yyay!!!!!");
                    const newMultipleChoiceOption = [
                        {
                            index: 0,
                            option: "Option " + 1,
                            chosen: false,
                        },
                        {
                            index: 1,
                            option: "Option " + 2,
                            chosen: false,
                        },
                    ] as MultipleChoiceOption[];
                    competition.IdToQuestion[question.questionId] = {
                        ...question,
                        options: newMultipleChoiceOption,
                    };
                    return;
                } else if (question.type === "SingleChoiceQuestion") {
                    const newSingleChoiceOption = [
                        {
                            index: 0,
                            option: "Option " + 1,
                            chosen: false,
                        },
                        {
                            index: 1,
                            option: "Option " + 2,
                            chosen: false,
                        },
                    ] as SingleChoiceOption[];
                    competition.IdToQuestion[question.questionId] = {
                        ...question,
                        options: newSingleChoiceOption,
                    };
                    return;
                } else {
                    competition.IdToQuestion[question.questionId] = {
                        ...question,
                        question: "Short Question to Ask",
                        response: "",
                    };
                }
            }
        },
        addOption: (state, action: PayloadAction<{ competitionId: string; questionId: string }>) => {
            const { competitionId, questionId } = action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            if (competition) {
                const question = competition.IdToQuestion[questionId];
                // Ensure the question is of type "MultipleChoiceQuestion"
                switch (question.type) {
                    case "MultipleChoiceQuestion":
                        // Clone the question options to avoid mutating the state directly
                        const originalMultipleChoiceOptions = lodash.clone(question.options);

                        // Create a new option with the appropriate index
                        const newMultipleChoiceOption = {
                            index: originalMultipleChoiceOptions.length, // New option index is the current length of the options array
                            option: "Option " + (originalMultipleChoiceOptions.length + 1),
                            chosen: false,
                        };

                        // Add the new option to the cloned options array
                        originalMultipleChoiceOptions.push(newMultipleChoiceOption);

                        // Update the question with the new options array
                        competition.IdToQuestion[questionId] = {
                            ...question,
                            options: originalMultipleChoiceOptions,
                        };
                        return;
                    case "SingleChoiceQuestion":
                        // Clone the question options to avoid mutating the state directly
                        const originalSingleChoiceOptions = lodash.clone(question.options);

                        const newSingleChoiceOption = {
                            index: originalSingleChoiceOptions.length, // New option index is the current length of the options array
                            option: "Option " + (originalSingleChoiceOptions.length + 1),
                            chosen: false,
                        };

                        // Add the new option to the cloned options array
                        originalSingleChoiceOptions.push(newSingleChoiceOption);

                        competition.IdToQuestion[questionId] = {
                            ...question,
                            options: originalSingleChoiceOptions,
                        };
                        return;
                }
            }
        },
        updateCompetition: (state, action: PayloadAction<{ competitionId: string; competition: Competition }>) => {
            const { competitionId, competition } = action.payload;
            if (state.competitions.idToObject && state.competitions.idToObject[competitionId]) {
                state.competitions.idToObject[competitionId] = competition;
            }
        },
        updateQuestion: (state, action: PayloadAction<{ competitionId: string; questionId: string; question: Question }>) => {
            const { competitionId, questionId, question } = action.payload;
            if (state.competitions.idToObject?.[competitionId] && state.competitions.idToObject[competitionId].IdToQuestion[questionId]) {
                state.competitions.idToObject[competitionId].IdToQuestion[questionId] = question;
            }
        },
        deleteQuestion: (state, action: PayloadAction<{ competitionId: string; questionId: string }>) => {
            const { competitionId, questionId } = action.payload;
            const competition = state.competitions.idToObject?.[competitionId];
            if (competition && competition.IdToQuestion?.[questionId]) {
                competition.questionIds = competition.questionIds.filter((id) => id !== questionId);
                delete competition.IdToQuestion[questionId];
            }
        },
    },
    extraReducers: (builder) => {},
});

export class UserThunkAction {
    public static createUser = createAsyncThunk("userSlice/createUser", async (props: CreateUserRequest, api) => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_USER, props);
        return processRes(res, api);
    });
}

export const competitionMiddleware = createListenerMiddleware();
registerDialogAndActions(competitionMiddleware, [
    ...loadingActions(UserThunkAction.createUser),
    {
        // rejections: [UserThunkAction.createUser.rejected, UserThunkAction.updateUser.rejected],
    },
]);

export default competitionSlice;
