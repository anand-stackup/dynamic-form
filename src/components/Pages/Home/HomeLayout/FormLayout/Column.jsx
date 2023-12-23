import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Column = ({
    col,
    colIndex,
    rowIndex,
    deleteColumn,
    formik,
    openModal,
    moveCol,
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "string",
        drop: (item) => {
            console.log(rowIndex, colIndex);
            addDropValue(item.type, rowIndex, colIndex);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // drag column
    const [{ isDragging }, dragRef] = useDrag({
        type: "item",
        item: { colIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // drop column
    const [spec, dropRef] = useDrop({
        accept: "item",
        hover: (item, monitor) => {
            const dragIndex = item.colIndex;
            const hoverIndex = colIndex;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const hoverActualX = monitor.getClientOffset().x - hoverBoundingRect.left;
            // console.log(
            //     "drag",
            //     dragIndex,
            //     "hover",
            //     hoverIndex,
            //     "midx",
            //     hoverMiddleX,
            //     "actx",
            //     hoverActualX
            // );

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualX < hoverMiddleX) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualX > hoverMiddleX) return;

            moveCol(dragIndex, hoverIndex, rowIndex);
            item.colIndex = hoverIndex;
        },
    });

    // join two refs
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    function addDropValue(type, rowIndex, colIndex) {
        // console.log(rowIndex, colIndex);
        formik.setFieldValue(`rows[${rowIndex}].cols[${colIndex}].value`, type);
    }

    return (
        <>
            <div className="col" style={{ opacity: isDragging ? 0 : 1 }} ref={dragDropRef} >
                <i title="Drag Col"  className="fa-solid fa-grip-vertical grip"></i>
                <div className="col-title">
                    <label htmlFor="">{col.label}</label>
                    <div>
                        <button
                            type="button"
                            className="btn attribute"
                            onClick={() => {
                                openModal(rowIndex, colIndex);
                            }}
                        >
                            <i className="fa-solid fa-gear"></i>
                        </button>
                        <button
                            type="button"
                            className="btn delete-col"
                            onClick={() => deleteColumn(rowIndex, colIndex)}
                        >
                            <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                </div>
                {col.value === "textarea" ? (
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        placeholder={col.placeholder}
                        value={col.value}
                        ref={drop}
                    ></textarea>
                ) : (
                    <input
                        type={col.value}
                        placeholder={col.placeholder}
                        value={col.value}
                        ref={drop}
                    />
                )}
            </div>
        </>
    );
};

export default Column;
