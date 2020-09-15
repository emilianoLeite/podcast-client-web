import React from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { DragDropContext, Droppable, Draggable, DraggableProvidedDraggableProps, DropResult } from "react-beautiful-dnd";
import { usePlayQueue } from "../hooks/usePlayQueue";
import { PodcastEpisode } from "../../../types/Podcast";

const reorder = (list: ReadonlyArray<PodcastEpisode> | undefined, startIndex: number, endIndex: number) => {
  const result = Array.from(list || []);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 2;

const getItemStyles = (isDragging: boolean, draggableStyle: DraggableProvidedDraggableProps["style"]) => ({
  display: "flex",
  alignItems: "center",
  background: "white",
  userSelect: "none" as const,
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  border: isDragging ? "1px solid grey" : "1px solid lightgrey",
  boxShadow: isDragging ? "0 8px 16px 0 rgba(0,0,0,0.2)" : "",
  ...draggableStyle,
});

export const PlayQueue = () => {
  const { currentUser, userData } = useCurrentUser();
  const playQueue = usePlayQueue(userData);
  const [items, setItems] = React.useState(playQueue);
  React.useEffect(() => {
    setItems(playQueue);
  }, [playQueue]);

  const handleDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
    currentUser.updatePlayQueue(reorderedItems.map((episode) => episode.id));
  };

  return (
    <React.Fragment>
      <h1> Your Play Queue </h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ padding: grid, width: 500, listStyleType: "none" }}
            >
              {/* TODO: Arrumar este "flicker" com React.Suspense */}
              {items.length > 0 ? items.map((episode, index) => (
                <Draggable key={episode.id} draggableId={episode.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyles(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <span>☰</span>
                      <img height="50px" width="50px" style={{ margin: "0px 5px" }} src={episode.thumbnail} alt="Episode's thumbnail"/>
                      <span>
                        {episode.title}
                      </span>
                    </li>
                  )}
                </Draggable>
              )) : <h2>The Play Queue is empty</h2>}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
};
