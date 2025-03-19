import { FaRegTrashCan } from "react-icons/fa6";
import { IconButton, Switch } from "@mui/material";
import { useAppDispatch } from "../../../../redux/hooks";
import competitionSlice from "../../../../redux/slices/competitionSlice";
import InteractiveWrapper from "../../../../components/InteractiveWrapper";

export default ({ competitionId, questionId, mustFill }: { competitionId: string; mustFill: boolean; questionId: string }) => {
    const dispatch = useAppDispatch();

    const handleDeleteOnClick = () => {
        dispatch(competitionSlice.actions.deleteQuestion({ competitionId: competitionId, questionId: questionId }));
    };

    const handleChangeCompulsoryStatus = () => {
        dispatch(competitionSlice.actions.changeQuestionCompulsoryStatusToTheOpposite({ competitionId: competitionId, questionId: questionId }));
    };
    return (
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <InteractiveWrapper onClick={handleDeleteOnClick}>
                <FaRegTrashCan style={{ width: "20px", height: "40px", cursor: "pointer" }} />
            </InteractiveWrapper>
            <div style={{ height: "40px", width: "1px", backgroundColor: "grey", opacity: 0.2, marginLeft: "20px", marginRight: "20px" }} />
            <div>Must Fill</div>
            <Switch defaultChecked={mustFill} onClick={handleChangeCompulsoryStatus} />
        </div>
    );
};
