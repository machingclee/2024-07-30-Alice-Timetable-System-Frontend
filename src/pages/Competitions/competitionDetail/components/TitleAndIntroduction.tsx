import { Box, Checkbox, Radio, TextField } from "@mui/material";
import boxShadow from "../../../../constant/boxShadow";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { MultipleChoiceOption, MultipleChoiceQuestion, RoleInSystem, UserDTO } from "../../../../dto/dto";
import { Property } from "csstype";
import Spacer from "../../../../components/Spacer";
import lodash, { debounce } from "lodash";
import Label from "../../../../components/Label";
import UpdateTextField from "./UpdateTextField";
import competitionSlice from "../../../../redux/slices/competitionSlice";

export default ({ title, intro, competitionId }: { title: string; intro: string; competitionId: string }) => {
    const dispatch = useAppDispatch();
    const tableRef = useRef<HTMLTableElement>(null);
    const [startEdit, setStartEdit] = useState(false);
    const competition = useAppSelector((s) => s.competition.competitions.idToObject?.[competitionId]);
    if (!competition) return;
    const [hasDistinction, setHasDistinction] = useState(false);
    const authData = useAppSelector((s) => s.auth.user);
    const formData = useRef<{ name: string; intro: string }>({
        name: title,
        intro: intro,
    });

    const checkDataDistinction = useCallback(
        debounce(() => {
            const oldData = { title, intro };
            const newData = formData.current;
            const hasDistinction_ = !lodash.isEqual(oldData, newData);
            setHasDistinction(hasDistinction_);
            dispatch(
                competitionSlice.actions.updateCompetition({
                    competitionId: competitionId,
                    competition: { ...competition, name: formData.current.name, intro: formData.current.intro },
                })
            );
        }, 300),
        []
    );

    const onFieldUpdate = (update: Partial<{ name: string; intro: string }>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
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
                alignItems: "center",
                justifyContent: "space-between",
                "& input": {
                    width: "100%",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    flex: 1,
                    padding: "1.4px",
                    border: "none",
                    outline: "none",
                },
                "& td:nth-child(1)": {
                    verticalAlign: "middle",
                    width: "100px",
                },
                "& td:nth-child(2), & td:nth-child(3)": {
                    display: "flex",
                    width: "300px",
                    borderRadius: "4px",
                    padding: "5px",
                },
            }}
        >
            <table
                ref={tableRef}
                onClick={() => {
                    setStartEdit(true);
                }}
            >
                <tbody>
                    {/* Title */}
                    <tr>
                        {!startEdit && <td style={{ color: "dark", fontSize: 24, fontWeight: "bold", fontStyle: "normal", paddingTop: 15, width: 1000 }}>{title}</td>}
                        {startEdit && (
                            <td>
                                <UpdateTextField
                                    fontSize={"24px"}
                                    style={{ marginTop: 10 }}
                                    placeholder="Question to Ask"
                                    defaultValue={title}
                                    onChange={(t) => {
                                        onFieldUpdate({ name: t });
                                    }}
                                />
                            </td>
                        )}
                    </tr>
                    <Spacer />
                    {/* Title */}
                    <tr>
                        {!startEdit && <td style={{ color: "dark", fontSize: 18, fontStyle: "normal", paddingTop: 15, width: 1000 }}>{intro}</td>}
                        {startEdit && (
                            <td>
                                <UpdateTextField
                                    fontSize={"18px"}
                                    style={{ marginTop: 5 }}
                                    placeholder="Question to Ask"
                                    defaultValue={intro}
                                    onChange={(t) => {
                                        onFieldUpdate({ intro: t });
                                    }}
                                />
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
            {/* <div style={{ display: "flex" }}>
                {startEdit && (
                    <Button onClick={submitUpdate} disabled={!hasDistinction}>
                        Update
                    </Button>
                )}
                <Spacer />
                <Button
                    disabled={authData.role_in_system !== "SUPER_ADMIN"}
                    onClick={() => {
                        setStartEdit((isEditing) => !isEditing);
                    }}
                >
                    {!startEdit ? "Edit" : "Cancel"}
                </Button>
            </div> */}
        </Box>
    );
};
