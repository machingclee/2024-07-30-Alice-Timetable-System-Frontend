import SectionTitle from "../../components/SectionTitle";
import Spacer from "../../components/Spacer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import competitionSlice from "../../redux/slices/competitionSlice";
import { Button } from "antd";
import CompetitionRow from "./components/CompetitionRow";
export default () => {
    const competitionIds = useAppSelector((s) => s.competition.competitions.ids);
    const dispatch = useAppDispatch();

    const handleAddCompetitionOnClick = () => {
        const competition = {
            name: "Untitled Table",
            intro: "Table Description",
            questionIds: [],
            IdToQuestion: {},
        };
        console.log("competitionIds?.length.toString():", competitionIds?.length.toString());
        dispatch(
            competitionSlice.actions.addCompetition({
                id: competitionIds?.length.toString() || "0",
                competition: competition,
            })
        );
    };

    useEffect(() => {
        // dispatch(
        //     competitionSlice.actions.addCompetition({
        //         id: "0",
        //         competition: {
        //             name: "Title",
        //             intro: "Intro",
        //             questionIds: [],
        //             IdToQuestion: {},
        //         },
        //     })
        // );
    }, []);

    return (
        <div style={{ marginBottom: 20 }}>
            <SectionTitle>Competitions</SectionTitle>
            <Spacer />
            {competitionIds && competitionIds?.map((id) => <CompetitionRow key={id} id={id} />)}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Button type="primary" onClick={handleAddCompetitionOnClick}>
                    Add
                </Button>
            </div>
        </div>
    );
};
