import { useEffect, useState } from 'react';
import apiClient from '../../axios/apiClient';
import apiRoutes from '../../axios/apiRoutes';
import { CustomResponse } from '../../axios/responseTypes';
import { Loggings } from '../../dto/dto';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const LIMIT = 20;

export default function Logging() {
    const [page, _] = useState(0);

    const [loggings, setLoggings] = useState<Loggings>([]);
    useEffect(() => {
        apiClient.get<CustomResponse<Loggings>>(apiRoutes.GET_LOGGING({ page, limit: LIMIT })).then(res => {
            if (res.data.success) {
                setLoggings(res.data.result);
            }
        });
    }, [page]);

    return (
        <div>
            <Box
                sx={{
                    table: { borderCollapse: 'collapse' },
                    '& th': { textAlign: 'left', padding: '2px 10px' },
                    '& tr': {
                        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                        fontSize: 12,
                    },
                    '& td': { padding: '4px 10px' },
                    '& tr:nth-child(2n+1)': {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                }}
            >
                <table>
                    <thead>
                        <th>User</th>
                        <th>Action</th>
                        <th>Time</th>
                        <th>Data</th>
                    </thead>
                    <tbody>
                        {loggings.map(log => {
                            const { created_at, event_type, payload } = log;
                            const { ctx, data } = payload;
                            const userEmail = ctx.userEmail;
                            return (
                                <tr>
                                    <td>{userEmail}</td>
                                    <td>{event_type}</td>
                                    <td>{dayjs(created_at).format('YYYY-MM-DD H:mm:ss')}</td>
                                    <td>{JSON.stringify(data)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Box>
        </div>
    );
}
