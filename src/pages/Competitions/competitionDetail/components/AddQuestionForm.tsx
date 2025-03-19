import { Button, Select } from 'antd';
import Spacer from '../../../../components/Spacer';
import { useRef, useState } from 'react';
import { CreateUserRequest, Question, QuestionType, RoleInSystem } from '../../../../dto/dto';
import SectionTitle from '../../../../components/SectionTitle';
import { useAppDispatch } from '../../../../redux/hooks';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import AddQuestionDialog from './AddQuestionDialog';
import competitionSlice from '../../../../redux/slices/competitionSlice';
import genUtil from '../../../../utils/tokenUtil';

export default ({ competitionId }: { competitionId: string }) => {
    const dispatch = useAppDispatch();
    const formData = useRef<QuestionType>('ShortQuestion');
    const update = (update_: QuestionType) => {
        formData.current = update_;
    };
    const handleChange = (value: QuestionType) => {
        update(value);
    };

    const submit = () => {
        let question: Question;
        // Determine the question type and construct the appropriate object
        switch (formData.current) {
            case 'MultipleChoiceQuestion':
                question = {
                    type: 'MultipleChoiceQuestion',
                    questionId: genUtil.generateRandomHexString(),
                    question: 'Question to Ask', // Could be from form input
                    options: [], // You need to construct this from form input
                    compulsory: true,
                };
                AddQuestionDialog.setOpen(false);
                break;
            case 'SingleChoiceQuestion':
                question = {
                    type: 'SingleChoiceQuestion',
                    questionId: genUtil.generateRandomHexString(),
                    question: 'Question to Ask', // Could be from form input
                    options: [], // You need to construct this from form input
                    compulsory: true,
                };
                AddQuestionDialog.setOpen(false);
                break;
            case 'ShortQuestion':
                question = {
                    type: 'ShortQuestion',
                    questionId: genUtil.generateRandomHexString(),
                    question: 'Question to Ask', // Could be from form input
                    response: '', // You need to construct this from form input
                    compulsory: true,
                };
                AddQuestionDialog.setOpen(false);
                break;
            default:
                AddQuestionDialog.setOpen(false);
                throw new Error('Invalid question type');
        }

        dispatch(
            competitionSlice.actions.addQuestion({
                competitionId: competitionId,
                question: question,
            })
        );
    };

    return (
        <Box
            style={{
                maxWidth: 400,
                width: 600,
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <SectionTitle>Question Type</SectionTitle>
            <Spacer height={10} />
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Short Question"
                    name="radio-buttons-group"
                    onChange={e => {
                        handleChange(e.target.value as QuestionType);
                    }}
                >
                    <FormControlLabel value="ShortQuestion" control={<Radio />} label="Short Question" />
                    <FormControlLabel value="SingleChoiceQuestion" control={<Radio />} label="Single-choice Question" />
                    <FormControlLabel
                        value="MultipleChoiceQuestion"
                        control={<Radio />}
                        label="Multiple-choice Question"
                    />
                </RadioGroup>
            </FormControl>
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Confirm
            </Button>
        </Box>
    );
};
