import { Box, Radio, TextField } from "@mui/material";
import boxShadow from "../../../../constant/boxShadow";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { MultipleChoiceOption, SingleChoiceOption, SingleChoiceQuestion, User } from "../../../../dto/dto";
import { Button, Select } from "antd";
import Spacer from "../../../../components/Spacer";
import { UserThunkAction } from "../../../../redux/slices/userSlice";
import lodash, { debounce } from "lodash";
import Label from "../../../../components/Label";
import competitionSlice from "../../../../redux/slices/competitionSlice";
import UpdateTextField from "./UpdateTextField";
import QuestionBottomProps from "./QuestionBottomProps";
import Option from "./Option";
import tokenUtil from "../../../../utils/tokenUtil";

export default ({ question, competitionId }: { competitionId: string; question: SingleChoiceQuestion }) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [startEdit, setStartEdit] = useState(false);
    const [hasDistinction, setHasDistinction] = useState(false);
    const authData = useAppSelector((s) => s.auth.user);
    const formData = useRef<SingleChoiceQuestion>(question);
    const submitUpdate = async () => {
        // await dipatch(UserThunkAction.updateUser({ ...user, ...formData.current })).unwrap();
        setStartEdit(false);
    };

    const checkDataDistinction = useCallback(
        debounce(() => {
            const oldData = question;
            const newData = formData.current;
            const hasDistinction_ = !lodash.isEqual(oldData, newData);
            setHasDistinction(hasDistinction_);
            dispatch(competitionSlice.actions.updateQuestion({ competitionId: competitionId, questionId: question.questionId, question: formData.current }));
        }, 300),
        [question]
    );

    const updateOptionAtId = (optionId: string, updatedOption: Partial<MultipleChoiceOption>) => {
        const updatedOption_ = {
            ...updatedOption,
            id: optionId,
        };
        // Create a shallow copy of optionIdToOption to avoid direct mutation
        const optionIdToOption = {
            ...formData.current.optionIdToOption,
            [optionId]: {
                ...formData.current.optionIdToOption[optionId], // Copy the existing option
                ...updatedOption_, // Apply the updates
            },
        };
        // Additional Object is added
        if (Object.keys(optionIdToOption).length !== Object.keys(formData.current.optionIdToOption).length) {
            console.log("Additional object!!!!!!");
            const newIds = lodash.clone(formData.current.optionIds);
            newIds.push(optionId);
            const updatedFormData = {
                ...formData.current,
                optionIdToOption: optionIdToOption,
                optionIds: newIds,
            };
            onFieldUpdate(updatedFormData);
        } else {
            const updatedFormData = {
                ...formData.current,
                optionIdToOption: optionIdToOption,
            };
            onFieldUpdate(updatedFormData);
        }
    };

    const onFieldUpdate = (update: Partial<SingleChoiceQuestion>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };

    const handleDeleteOption = (optionId: string) => {
        dispatch(competitionSlice.actions.deleteOption({ competitionId: competitionId, questionId: question.questionId, optionId: optionId }));
    };

    const createNewOption = () => {
        const optionId = tokenUtil.generateRandomHexString();
        const optionText = "Option " + (question.optionIds.length + 1);
        const newMultipleChoiceOption = {
            id: optionId,
            option: optionText,
            chosen: false,
        };
        const updatedIds = lodash.clone(formData.current.optionIds).filter((id) => id !== optionId);
        updatedIds.push(optionId);
        const updatedIdToObject = lodash.cloneDeep(formData.current.optionIdToOption);
        updatedIdToObject[optionId] = newMultipleChoiceOption;
        const updatedFormData = {
            ...formData.current,
            optionIdToOption: updatedIdToObject,
            optionIds: updatedIds,
        };
        dispatch(
            competitionSlice.actions.addOption({
                optionId: optionId,
                optionText: optionText,
                competitionId: competitionId,
                questionId: question.questionId,
            })
        );
        onFieldUpdate(updatedFormData);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setStartEdit(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Box
            style={{
                boxShadow: boxShadow.SHADOW_62,
                padding: "20px 30px",
                marginBottom: "15px",
                borderRadius: "8px",
            }}
            sx={{
                display: "flex",
                flexDirection: "column",
                "& input": {
                    width: "100%",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    flex: 1,
                    padding: "1.4px",
                    border: "none",
                    outline: "none",
                },
            }}
            ref={containerRef}
            onClick={() => {
                setStartEdit(true);
            }}
        >
            <div>
                {/* Question */}
                {!startEdit && <div style={{ color: "dark", fontSize: 18, fontStyle: "normal", paddingTop: 10, width: "100%" }}>{question.question}</div>}
                {startEdit && (
                    <UpdateTextField
                        fontSize={"18px"}
                        style={{ marginTop: 5 }}
                        placeholder="Question to Ask"
                        defaultValue={question.question}
                        onChange={(t) => onFieldUpdate({ question: t })}
                    />
                )}
            </div>
            <Spacer />
            {/* Options */}
            {question.optionIds.map((optionId, index) => (
                <Option
                    key={optionId}
                    optionId={optionId}
                    competitionId={competitionId}
                    questionId={question.questionId}
                    index={index.toString()}
                    startEdit={startEdit}
                    updateOptionAtId={updateOptionAtId}
                    handleDeleteOption={handleDeleteOption}
                />
            ))}
            <div style={{ display: "flex", alignItems: "center" }}>
                <Radio disabled style={{ paddingTop: 20 }} />
                <div style={{ width: 200, fontSize: 15, cursor: "text", opacity: 0.5, paddingTop: 10 }} onMouseDown={createNewOption}>
                    Add One More Option
                </div>
            </div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "grey", marginTop: 10, marginBottom: 10, opacity: 0.2 }} />
            <QuestionBottomProps competitionId={competitionId} questionId={question.questionId} mustFill={question.compulsory} />
        </Box>
    );
};
