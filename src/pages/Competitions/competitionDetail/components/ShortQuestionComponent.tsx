import { Box, Checkbox, Radio, TextField } from "@mui/material";
import boxShadow from "../../../../constant/boxShadow";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { MultipleChoiceOption, MultipleChoiceQuestion, RoleInSystem, ShortQuestion, User } from "../../../../dto/dto";
import { Property } from "csstype";
import Spacer from "../../../../components/Spacer";
import lodash, { debounce } from "lodash";
import Label from "../../../../components/Label";
import UpdateTextField from "./UpdateTextField";
import competitionSlice from "../../../../redux/slices/competitionSlice";
import QuestionBottomProps from "./QuestionBottomProps";

export default ({ question, competitionId }: { competitionId: string; question: ShortQuestion }) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [startEdit, setStartEdit] = useState(false);
    const [hasDistinction, setHasDistinction] = useState(false);
    const authData = useAppSelector((s) => s.auth.user);
    const formData = useRef<ShortQuestion>(question);
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

    const onFieldUpdate = (update: Partial<ShortQuestion>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
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
            {/* Short response input field */}
            <TextField disabled placeholder="Short Response" id="standard-basic" variant="standard" style={{ marginTop: 15, width: 300 }} />
            <div style={{ width: "100%", height: "1px", backgroundColor: "grey", marginTop: 50, marginBottom: 10, opacity: 0.2 }} />
            <QuestionBottomProps competitionId={competitionId} questionId={question.questionId} mustFill={question.compulsory} />
        </Box>
    );
};
