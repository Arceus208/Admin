import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventChangeArg,
  EventAddArg,
  EventRemoveArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { NavBar } from "../components/navbar/NavBar";
import { v4 as uuidv4 } from "uuid";
import { axiosPublic } from "../utils/axiosPublic";
import { useEvents } from "../hooks/useEvents";
import styled from "@emotion/styled";
import useSWR from "swr";
import Wrapper from "../components/ui/Wrapper";

interface CalendarProps {}

export const StyleWrapper = styled.div`
  .fc-daygrid-event {
    dipslay: flex;
    flex-direction: column;
    white-space: normal !important;
    background-color: teal;
    color: white;
    text-align: center;
  }

  .fc-toolbar-chunk {
    display: flex;
  }

  .fc-header-toolbar {
    display: flex;
    flex-direction: column;
  }

  .fc-daygrid-event-dot {
    display: none;
  }
`;

export const Calendar: React.FC<CalendarProps> = () => {
  const { data, error } = useEvents();

  const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data);
  const { data: todayData, error: todayError } = useSWR(
    "/events/todayEvents",
    fetcher
  );

  const handleDateClick = (event: DateSelectArg) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = event.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: uuidv4(),
        title,
        start: event.startStr,
        end: event.endStr,
        allDay: event.allDay,
      });
    }
  };

  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleEventChange = async (event: EventChangeArg) => {
    try {
      await axiosPublic.patch("/events/editEvent", {
        id: event.event.id,
        title: event.event.title,
        start: event.event.start,
        end: event.event.end,
        allDay: event.event.allDay,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventAdd = async (event: EventAddArg) => {
    try {
      await axiosPublic.post("/events/newEvent", {
        id: event.event.id,
        title: event.event.title,
        start: event.event.start,
        end: event.event.end,
        allDay: event.event.allDay,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventRemove = async (event: EventRemoveArg) => {
    try {
      await axiosPublic.delete(`/events/deleteEvent/${event.event.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex>
      <NavBar></NavBar>
      <Wrapper>
        <Text fontSize={30} mb={10} fontWeight="bold">
          Calendar
        </Text>
        <Flex
          alignItems={["center", "center", "flex-start"]}
          flexDirection={["column", "column", "row"]}
        >
          <Flex
            flexDirection="column"
            boxShadow="xl"
            p={5}
            mb={10}
            bgColor="white"
            borderRadius={10}
          >
            <Text mt={5} fontWeight="bold">
              Today events:
            </Text>

            {todayData && !todayError && (
              <List w={[400, 400, 200]}>
                {todayData.events.map((event: any) => (
                  <ListItem key={Math.random()}>
                    <Box
                      bgColor="teal"
                      my={2}
                      p={2}
                      borderRadius={10}
                      textAlign="center"
                    >
                      <Text color="white">{event.title}</Text>
                      <Text color="white">
                        {new Date(event.start).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                        -
                        {new Date(event.end).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </Text>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Flex>
          <Flex
            px={5}
            bgColor="white"
            borderRadius={10}
            boxShadow="xl"
            p={10}
            mx={4}
          >
            {data && !error && (
              <StyleWrapper>
                <FullCalendar
                  eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: "short",
                  }}
                  height="auto"
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                  ]}
                  headerToolbar={{
                    /*  center: "prev,next today", */
                    right: "title",
                    left: "dayGridMonth,timeGridWeek,timeGridDay,listMonth,prev,next today",
                  }}
                  initialView="dayGridMonth"
                  initialEvents={data.events}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  select={handleDateClick}
                  eventClick={handleEventClick}
                  eventChange={handleEventChange}
                  /* eventsSet={(events: EventApi[]) => setCurrentEvents(events)} */
                  eventAdd={handleEventAdd}
                  eventRemove={handleEventRemove}
                ></FullCalendar>
              </StyleWrapper>
            )}
          </Flex>
        </Flex>
      </Wrapper>
    </Flex>
  );
};
