import React from "react";
import { useUserData } from "../hooks/useUserData";
import { DragDropContext, Droppable, Draggable, DraggableProvidedDraggableProps, DropResult } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list: string[] | undefined, startIndex: number, endIndex: number) => {
  const result = Array.from(list || []);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 2;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableProvidedDraggableProps["style"]) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none" as const,
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  border: "1px solid black",
  textOverflow: "ellipsis",
  overflowX: "hidden" as const,

  // change background colour if dragging
  background: isDragging ? "lightgrey" : "",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const PlayQueue = () => {
  const userData = useUserData();
  const playQueue = userData?.playQueue;
  const [items, setItems] = React.useState(playQueue);
  React.useEffect(() => {
    setItems(playQueue);
  }, [playQueue]);

  const onDragEnd = (result: DropResult) => {
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
    // TODO: update order in firestore
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ padding: grid, width: 300, listStyleType: "none" }}
          >
            {items ? items.map((episodeId, index) => (
              <Draggable key={episodeId} draggableId={episodeId} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {episodeId}
                  </li>
                )}
              </Draggable>
            )) : <span>{JSON.stringify(userData)}</span>}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
