import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import competitionSlice from "../../../redux/slices/competitionSlice";
import SectionTitle from "../../../components/SectionTitle";
import Spacer from "../../../components/Spacer";
import TitleAndIntroduction from "../competitionDetail/components/TitleAndIntroduction";
import GeneralQuestion from "../competitionDetail/components/GeneralQuestion";
import { Button } from "antd";
import AddQuestionForm from "../competitionDetail/components/AddQuestionForm";
import AddQuestionDialog from "../competitionDetail/components/AddQuestionDialog";
import { useNavigate, useParams } from "react-router-dom";

export default () => {
    const { competitionId } = useParams();
    const navigate = useNavigate();
    if (!competitionId) return;
    const competition = useAppSelector((s) => s.competition.competitions.idToObject?.[competitionId]);
    const dispatch = useAppDispatch();

    return (
        <div style={{ marginBottom: 20 }}>
            <SectionTitle>Competitions</SectionTitle>
            <Spacer />
            <TitleAndIntroduction competitionId={competitionId} title={competition?.name || "Untitled Table"} intro={competition?.intro || "Table Description"} />
            {competition &&
                competition.questionIds.map((id, index) => {
                    return <GeneralQuestion key={id} competitionId={competitionId} questionId={id} index={index} />;
                })}
            <Spacer />
            <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            AddQuestionDialog.setContent(() => () => <AddQuestionForm competitionId={competitionId} />);
                            AddQuestionDialog.setOpen(true);
                        }}
                    >
                        Add Question
                    </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                        type="default"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Return
                    </Button>
                </div>
            </div>
            <AddQuestionDialog.render />
        </div>
    );
};
