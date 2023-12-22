import React, { useRef } from "react";
import Column from "./Column";
import { useDrag, useDrop } from "react-dnd";

const Row = ({ row, rowIndex, deleteColumn, formik, openModal, addColumn, moveItem }) => {

    const [{ isDragging }, dragRef] = useDrag({
        type: "item",
        item: { rowIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });


    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.rowIndex
            const hoverIndex = rowIndex
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)/2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
            // console.log('drag', dragIndex, 'hover', hoverIndex, 'midy', hoverMiddleY, 'acty', hoverActualY);

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    // join two refs 
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    // console.log(row);
    return (
        <>
            <div className="row" key={row._id} ref={dragDropRef}>
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
