import React, { useCallback, useRef } from "react";
import Column from "./Column";
import { useDrag, useDrop } from "react-dnd";

const Row = ({
    row,
    rowIndex,
    deleteColumn,
    formik,
    openModal,
    addColumn,
    moveItem,
}) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "item",
        item: { rowIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [spec, dropRef] = useDrop({
        accept: "item",
        hover: (item, monitor) => {
            const dragIndex = item.rowIndex;
            const hoverIndex = rowIndex;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY =
                monitor.getClientOffset().y - hoverBoundingRect.top;
            console.log('drag', dragIndex, 'hover', hoverIndex, 'midy', hoverMiddleY, 'acty', hoverActualY);

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            moveItem(dragIndex, hoverIndex);
            item.rowIndex = hoverIndex;
        },
    });

    // join two refs
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    const moveCol = useCallback(
        (dragIndex, hoverIndex, rowI) => {
            const dragItem = row.cols[dragIndex];
            const hoverItem = row.cols[hoverIndex];

            const updatedCols = [...row.cols];

            updatedCols[dragIndex] = hoverItem;
            updatedCols[hoverIndex] = dragItem;

            // formik.setFieldValue("cols", updatedCols);

            formik.setFieldValue(
                "rows",
                formik.values.rows.map((row, index) => {
                    if (index === rowI) {
                        return {
                            ...row,
                            cols: updatedCols,
                        };
                    }
                    return row;
                })
            );
        },
        [row.cols]
    );

    // console.log(row.cols[0]);
    return (
        <>
            <div
                className="row"
                key={row._id}
                style={{ opacity: isDragging ? 0 : 1 }}
            >
                <i
                    title="Drag Row"
                    className="fa-solid fa-grip grip"
                    ref={dragDropRef}
                ></i>
                {row.cols &&
                    row.cols.map((col, colIndex) => {
                        return (
                            <Column
                                key={col._id}
                                col={col}
                                colIndex={colIndex}
                                rowIndex={rowIndex}
                                deleteColumn={deleteColumn}
                                formik={formik}
                                openModal={openModal}
                                moveCol={moveCol}
                            />
                        );
                    })}

                {row.cols.length < 3 ? (
                    <button
                        type="button"
                        className="btn add-col"
                        onClick={() => addColumn(rowIndex)}
                    >
                        Add Column
                    </button>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Row;
