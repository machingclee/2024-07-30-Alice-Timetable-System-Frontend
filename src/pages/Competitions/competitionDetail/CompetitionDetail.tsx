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
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default () => {
    const { competitionId } = useParams();
    const navigate = useNavigate();
    if (!competitionId) return;
    const competition = useAppSelector((s) => s.competition.competitions.idToObject?.[competitionId]);
    const dispatch = useAppDispatch();

    // Handle drag end event
    const onDragEnd = (result: DropResult) => {
        console.log("Hi!!!!!!");
        if (!result.destination || !competition) return; // Check for valid destination

        const reorderedQuestionIds = reorder(competition.questionIds, result.source.index, result.destination.index);

        // Dispatch an action to update the competition with the new order of questions
        dispatch(
            competitionSlice.actions.updateQuestionOrder({
                competitionId,
                questionIds: reorderedQuestionIds,
            })
        );
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <SectionTitle>Competitions</SectionTitle>
            <Spacer />
            <TitleAndIntroduction competitionId={competitionId} title={competition?.name || "Untitled Table"} intro={competition?.intro || "Table Description"} />

            {/* DragDropContext to handle drag-and-drop */}
            <DragDropContext onDragEnd={onDragEnd}>
                {competition?.questionIds?.map((id, index) => (
                    <Droppable droppableId={id}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                userSelect: "none",
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            <GeneralQuestion competitionId={competitionId} questionId={id} index={index} />
                                        </div>
                                    )}
                                </Draggable>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>

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
