import { Button, Input } from "antd";
import boxShadow from "../../../constant/boxShadow";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import Spacer from "../../../components/Spacer";
import { Competition, Course } from "../../../dto/dto";
import Label from "../../../components/Label";
import { CourseThunkAction } from "../../../redux/slices/courseSlice";
import { debounce } from "lodash";
import lodash from "lodash";
import { useNavigate } from "react-router-dom";
import RouteEnum from "../../../enum/RouteEnum";
import { TextField } from "@mui/material";
import competitionSlice from "../../../redux/slices/competitionSlice";

export default (props: { id: string }) => {
    const { id } = props;
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const competition = useAppSelector((s) => s.competition.competitions.idToObject?.[id]);
    const formData = useRef<Competition>({
        name: competition?.name || "",
        intro: competition?.intro || "",
        questionIds: competition?.questionIds || [],
        IdToQuestion: competition?.IdToQuestion || {},
    });
    if (!competition) {
        return null;
    }

    const checkDataDistinction = useCallback(
        debounce(() => {
            const oldData = competition;
            const newData = formData.current;
            const hasDistinction_ = !lodash.isEqual(oldData, newData);
            setHasDistinction(hasDistinction_);
            dispatch(competitionSlice.actions.updateCompetition({ competitionId: id, competition: formData.current }));
        }, 300),
        [competition]
    );

    const updateField = (update: Partial<Competition>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setEditing(false);
        }
    };

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };
    const [hasDistinction, setHasDistinction] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            onClick={() => {
                setEditing(true);
            }}
            style={{
                boxShadow: boxShadow.SHADOW_62,
                padding: "20px 30px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
            }}
        >
            <div>
                <table>
                    <Label label="CourseRow.tsx" offsetTop={-20} />
                    <tbody>
                        <tr>
                            <td>Competition Name:</td>
                            {!editing && <td>{competition.name}</td>}
                            {editing && (
                                <td>
                                    <TextField
                                        onClick={handleFocus}
                                        inputRef={inputRef}
                                        id="standard-basic"
                                        variant="standard"
                                        style={{ width: 500 }}
                                        defaultValue={competition.name}
                                        onChange={(e) => {
                                            updateField({ name: e.target.value });
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ display: "flex" }}>
                <Button
                    onClick={() => {
                        navigate(`${RouteEnum.DASHBOARD_COMPETITIONS}/${id}`);
                    }}
                >
                    Detail
                </Button>
                <Spacer />
            </div>
        </div>
    );
};
