import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import MultipleChoiceComponent from "./MultipleChoiceComponent";
import ShortQuestionComponent from "./ShortQuestionComponent";
import SingleChoiceComponent from "./SingleChoiceComponent";

export default ({ competitionId, questionId, index }: { competitionId: string; questionId: string; index: number }) => {
    const question = useAppSelector((s) => s.competition.competitions.idToObject?.[competitionId].IdToQuestion?.[questionId]);
    const dispatch = useAppDispatch();
    if (!question) return;

    switch (question.type) {
        case "MultipleChoiceQuestion":
            return <MultipleChoiceComponent competitionId={competitionId} question={question} />;
        case "SingleChoiceQuestion":
            return <SingleChoiceComponent competitionId={competitionId} question={question} />;
        case "ShortQuestion":
            return <ShortQuestionComponent competitionId={competitionId} question={question} />;
        default:
            return <div key={index}>Unknown question type</div>;
    }
};
