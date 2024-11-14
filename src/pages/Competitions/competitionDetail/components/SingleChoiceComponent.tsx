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

    const updateOptionAtIndex = (index: number, updatedOption: Partial<SingleChoiceOption>) => {
        const currentOptions = formData.current.options;

        const newOptions = currentOptions.map((option, i) => (i === index ? { ...option, ...updatedOption } : option));

        onFieldUpdate({ options: newOptions });
    };

    const onFieldUpdate = (update: Partial<SingleChoiceQuestion>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };

    const createNewOption = () => {
        dispatch(
            competitionSlice.actions.addOption({
                competitionId: competitionId,
                questionId: question.questionId,
            })
        );
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
            <Label label="SingleChoiceComponent.tsx" offsetTop={-20} />
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
            {question.options.map((option, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                    <Radio disabled style={{ paddingTop: 15 }} />
                    {!startEdit && <div style={{ color: "dark", fontSize: 16, fontStyle: "normal", paddingTop: 10 }}>{option.option}</div>}
                    {startEdit && (
                        <UpdateTextField
                            style={{ marginTop: 5, fontSize: 16 }}
                            placeholder={`Option ${option.index + 1}`}
                            defaultValue={option.option}
                            onChange={(t) =>
                                updateOptionAtIndex(option.index, {
                                    option: t,
                                    chosen: false,
                                })
                            }
                        />
                    )}
                </div>
            ))}
            <div style={{ display: "flex", alignItems: "center" }}>
                <Radio disabled style={{ paddingTop: 20 }} />
                <div style={{ width: 200, fontSize: 15, cursor: "text", opacity: 0.5, paddingTop: 10 }} onMouseDown={createNewOption}>
                    Add One More Option
                </div>
            </div>
            <QuestionBottomProps competitionId={competitionId} questionId={question.questionId} mustFill={true} />
        </Box>
    );
};
