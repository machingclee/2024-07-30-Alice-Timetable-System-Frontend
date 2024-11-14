import { Box, Checkbox, Radio, Switch, TextField } from "@mui/material";
import boxShadow from "../../../../constant/boxShadow";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { MultipleChoiceOption, MultipleChoiceQuestion, RoleInSystem, User } from "../../../../dto/dto";
import lodash, { debounce } from "lodash";
import Label from "../../../../components/Label";
import competitionSlice from "../../../../redux/slices/competitionSlice";
import UpdateTextField from "./UpdateTextField";
import Spacer from "../../../../components/Spacer";
import { FaRegTrashCan } from "react-icons/fa6";
import QuestionBottomProps from "./QuestionBottomProps";

export default ({ question, competitionId }: { competitionId: string; question: MultipleChoiceQuestion }) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [startEdit, setStartEdit] = useState(false);
    const [hasDistinction, setHasDistinction] = useState(false);
    const formData = useRef<MultipleChoiceQuestion>(question);
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

    const updateOptionAtIndex = (index: number, updatedOption: Partial<MultipleChoiceOption>) => {
        const currentOptions = formData.current.options;

        const newOptions = currentOptions.map((option, i) => (i === index ? { ...option, ...updatedOption } : option));

        onFieldUpdate({ options: newOptions });
    };

    const onFieldUpdate = (update: Partial<MultipleChoiceQuestion>) => {
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
            <Label label="MultipleChoiceComponent.tsx" offsetTop={-20} />
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
                    <Checkbox disabled style={{ paddingTop: 15 }} />
                    {!startEdit && <div style={{ color: "dark", fontSize: 16, fontStyle: "normal", paddingTop: 10 }}>{option.option}</div>}
                    {startEdit && (
                        <UpdateTextField
                            style={{ paddingTop: 5, fontSize: 16 }}
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
                <Checkbox disabled style={{ paddingTop: 20 }} />
                <div style={{ width: 200, fontSize: 15, cursor: "text", opacity: 0.5, paddingTop: 10 }} onMouseDown={createNewOption}>
                    Add One More Option
                </div>
            </div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "grey", marginTop: 10, marginBottom: 10, opacity: 0.2 }} />
            <QuestionBottomProps competitionId={competitionId} questionId={question.questionId} mustFill={true} />
        </Box>
    );
};
