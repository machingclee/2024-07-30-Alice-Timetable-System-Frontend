import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import Spacer from '../../components/Spacer';
import AliceModalTrigger, { AliceModalProps } from '../../components/AliceModalTrigger';
import { Button } from 'antd';
import { CreateTicketRequest } from '../../dto/dto';
import FormInputField from '../../components/FormInputField';
import TextArea from 'antd/es/input/TextArea';
import { Droppable } from '../../components/DragAndDrop/Droppable';
import { Draggable } from '../../components/DragAndDrop/Draggable';
import boxShadow from '../../constant/boxShadow';
import Sep from '../../components/Sep';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TicketDTO } from '../../dto/kotlinDto';
import FormInputTitle from '../../components/FormInputTitle';
import { ticketApi } from '@/!rtk-query/api/ticketApi';
import LoadingContainer from '@/components/LoadingContainer';

const CONTAINER_WIDTH = 400;

export default function Tickets() {
    const { data: tickets = [], isFetching } = ticketApi.endpoints.getTickets.useQuery();
    const [updateTicketMutation] = ticketApi.endpoints.updateTicket.useMutation();

    return (
        <div>
            <SectionTitle>Tickets</SectionTitle>
            <Spacer />
            <AliceModalTrigger destroyOnClose={true} modalContent={CreateTicketModal}>
                <Button type="primary" loading={isFetching}>
                    Create Ticket
                </Button>
            </AliceModalTrigger>
            <Spacer />
            <div style={{ display: 'flex' }}>
                <div
                    className="bg-emerald-50"
                    style={{
                        width: CONTAINER_WIDTH,
                        border: '1px solid rgba(0,0,0,0.2)',
                        padding: 10,
                        height: 'calc(100vh - 160px)',
                        overflow: 'scroll',
                        borderRadius: 10,
                    }}
                >
                    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontSize: 16,
                                paddingBottom: 10,
                            }}
                        >
                            Doing
                        </div>
                        <LoadingContainer isLoading={isFetching} hideContentWhenLoading={true}>
                            <Droppable
                                style={{ flex: 1 }}
                                idleColor="transparent"
                                activeColor="rgba(255,255,255,0.2)"
                                isValidMove={(_data: TicketDTO) => {
                                    // return _data.isSolved == true;
                                    return true;
                                }}
                                onValidDrop={async fromTicket => {
                                    if (fromTicket.isSolved) {
                                        await updateTicketMutation({
                                            content: fromTicket.content,
                                            isSolved: false,
                                            solvedBy: fromTicket.solvedBy,
                                            ticketId: fromTicket.id,
                                            title: fromTicket.title,
                                        });
                                    }
                                }}
                            >
                                {tickets
                                    .filter(t => t.isSolved === false)
                                    .map(ticket => {
                                        return (
                                            <React.Fragment key={ticket.id}>
                                                <ResizableDraggableCard ticket={ticket} />

                                                <Spacer height={10} />
                                            </React.Fragment>
                                        );
                                    })}
                            </Droppable>
                        </LoadingContainer>
                    </div>
                </div>
                <Spacer />
                <div
                    style={{
                        width: CONTAINER_WIDTH,
                        border: '1px solid rgba(0,0,0,0.2)',
                        padding: 10,
                        overflow: 'scroll',
                        height: 'calc(100vh - 160px)',
                        borderRadius: 10,
                    }}
                    className="bg-emerald-50"
                >
                    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 5 }}>Done</div>
                        <LoadingContainer isLoading={isFetching} hideContentWhenLoading={true}>
                            <Spacer height={5} />

                            <Droppable
                                style={{ flex: 1, background: 'red' }}
                                idleColor="transparent"
                                activeColor="rgba(255,255,255,0.2)"
                                isValidMove={(_data: TicketDTO) => {
                                    // return _data.isSolved == false;
                                    return true;
                                }}
                                onValidDrop={async fromTicket => {
                                    if (!fromTicket.isSolved) {
                                        await updateTicketMutation({
                                            content: fromTicket.content,
                                            isSolved: true,
                                            solvedBy: fromTicket.solvedBy,
                                            ticketId: fromTicket.id,
                                            title: fromTicket.title,
                                        }).unwrap();
                                    }
                                }}
                            >
                                {tickets
                                    .filter(t => t.isSolved === true)
                                    .map(ticket => {
                                        return (
                                            <>
                                                <ResizableDraggableCard ticket={ticket} />
                                                <Spacer height={10} />
                                            </>
                                        );
                                    })}
                            </Droppable>
                        </LoadingContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

const EditTicketModal = (props: AliceModalProps & { ticket: TicketDTO }) => {
    const { ticket, setOpen: setTicketEditorOpen } = props;
    const [ticketData, setTicketData] = useState<TicketDTO>(ticket);
    const updateField = (key: keyof TicketDTO) => (text: string) => setTicketData(data => ({ ...data, [key]: text }));
    const [updateTicketMutation] = ticketApi.endpoints.updateTicket.useMutation();
    const submit = async () => {
        await updateTicketMutation({
            content: ticketData.content,
            isSolved: ticketData.isSolved,
            solvedBy: ticketData.solvedBy,
            ticketId: ticketData.id,
            title: ticketData.title,
        }).unwrap();
    };
    props.setOkText('Edit');
    props.setOnOk(submit);
    const [deleteTicketMutation] = ticketApi.endpoints.deleteTicket.useMutation();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <AliceModalTrigger
                    modalContent={props => {
                        props.setOkText('Yes');
                        props.setOnOk(async () => {
                            await deleteTicketMutation({ ticketId: ticket.id }).unwrap();
                            props.setOpen(false);
                        });
                        return <div>Are you sure to delete?</div>;
                    }}
                >
                    <Button
                        onClick={() => {
                            setTicketEditorOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </AliceModalTrigger>
            </div>
            <FormInputField defaultValue={ticketData.title} title="Title" onChange={e => updateField('title')(e)} />
            <FormInputField
                defaultValue={ticketData.solvedBy}
                title="Ticket Owner"
                onChange={e => updateField('solvedBy')(e)}
            />
            <FormInputTitle>Content</FormInputTitle>
            <Spacer height={5} />
            <TextArea
                value={ticketData.content}
                onChange={e => updateField('content')(e.target.value)}
                placeholder="Please input the ticket content"
                autoSize={{ minRows: 8, maxRows: 10 }}
            />
            <Spacer />
        </div>
    );
};

const ResizableDraggableCard = (props: { ticket: TicketDTO }) => {
    const { ticket } = props;
    const { content, solvedBy, title } = ticket;
    const [height, setHeight] = useState(0);
    return (
        <div style={{ position: 'relative', height }}>
            <Draggable
                maxZIndexOnHover={false}
                dynamicContentHeightSetter={setHeight}
                data={ticket}
                canDrag={true}
                // style={{ background: 'rgba(0,0,0,0)' }}
            >
                <AliceModalTrigger
                    destroyOnClose={false}
                    modalContent={props => <EditTicketModal {...props} ticket={ticket} />}
                    style={{ display: 'block' }}
                >
                    <div
                        className="border border-emerald-400"
                        style={{
                            cursor: 'pointer',
                            overflow: 'hidden',
                            borderRadius: 4,
                            backgroundColor: 'white',
                            boxShadow: boxShadow.SHADOW_47,
                            padding: 10,
                        }}
                    >
                        <div style={{ display: 'flex', fontWeight: 600 }}>{title}</div>

                        <div style={{ fontSize: 15 }}>{solvedBy}</div>
                        <Spacer height={5} />
                        <Sep />
                        <Spacer height={10} />
                        <Markdown
                            components={{
                                ul: ({ node: _, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                                ol: ({ node: _, ...props }) => <ul className="list-decimal pl-5 my-2" {...props} />,
                            }}
                            remarkPlugins={[remarkGfm]}
                        >
                            {content}
                        </Markdown>
                    </div>
                </AliceModalTrigger>
            </Draggable>
        </div>
    );
};

const initialState: CreateTicketRequest = {
    content: '',
    title: '',
    solvedBy: '',
};

const CreateTicketModal = (props: AliceModalProps) => {
    const [request, setRequest] = useState<CreateTicketRequest>(initialState);
    const [createTicketMutation] = ticketApi.endpoints.createTicket.useMutation();
    const submit = async () => {
        await createTicketMutation(request).unwrap();
    };

    props.setOnOk(submit);
    props.setOkText('Create');

    return (
        <div>
            <FormInputField
                title="Title"
                onChange={newValue => {
                    setRequest({ ...request, title: newValue });
                }}
            />
            <FormInputField
                title="Ticket Owner"
                onChange={newValue => {
                    setRequest({ ...request, solvedBy: newValue });
                }}
            />
            <TextArea
                value={request.content}
                onChange={e => setRequest({ ...request, content: e.target.value })}
                placeholder="Please input the ticket content"
                autoSize={{ minRows: 5, maxRows: 5 }}
            />
            <Spacer />
        </div>
    );
};
