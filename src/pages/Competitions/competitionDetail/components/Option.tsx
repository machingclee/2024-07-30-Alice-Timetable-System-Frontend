import { Checkbox, Radio } from "@mui/material";
import UpdateTextField from "./UpdateTextField";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { MultipleChoiceOption, SingleChoiceOption } from "../../../../dto/dto";
import InteractiveWrapper from "../../../../components/InteractiveWrapper";
import { RxCross2 } from "react-icons/rx";
import competitionSlice from "../../../../redux/slices/competitionSlice";

export default ({
    optionId,
    index,
    competitionId,
    questionId,
    startEdit,
    updateOptionAtId,
    handleDeleteOption,
}: {
    optionId: string;
    competitionId: string;
    questionId: string;
    index: string;
    startEdit: boolean;
    updateOptionAtId: (optionId: string, updatedOption: Partial<SingleChoiceOption | MultipleChoiceOption>) => void;
    handleDeleteOption: (optionId: string) => void;
}) => {
    const dispatch = useAppDispatch();
    const question = useAppSelector((s) => s.competition.competitions.idToObject?.[competitionId].IdToQuestion?.[questionId]);
    if (question?.type !== "MultipleChoiceQuestion" && question?.type !== "SingleChoiceQuestion") return;
    const option = question.optionIdToOption[optionId];

    return (
        <div key={option.id} style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            {question.type === "MultipleChoiceQuestion" ? <Checkbox disabled style={{ paddingTop: 15 }} /> : <Radio disabled style={{ paddingTop: 15 }} />}
            {!startEdit && <div style={{ color: "dark", fontSize: 16, fontStyle: "normal", paddingTop: 10 }}>{option.option}</div>}
            {startEdit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <UpdateTextField
                        style={{ paddingTop: 10, fontSize: 16 }}
                        placeholder={`Option ${index + 1}`}
                        defaultValue={option.option}
                        onChange={(t) =>
                            updateOptionAtId(option.id, {
                                id: option.id,
                                option: t,
                                chosen: false,
                            })
                        }
                    />
                    <InteractiveWrapper
                        onClick={() => {
                            handleDeleteOption(optionId);
                        }}
                    >
                        <RxCross2 style={{ width: "25px", height: "25px" }} />
                    </InteractiveWrapper>
                </div>
            )}
        </div>
    );
};
