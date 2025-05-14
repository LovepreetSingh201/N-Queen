import React, { useState } from 'react'
function ChessBoard() {
    const [undo, setundo] = useState([])
    function putQueen(e) {
        const data = e.target.id
        if(!undo.includes(data)){
            setundo([...undo, data]);
            cross(data)
      
        }
    }
    function cross(id, checked = true) {
        const tar = id;
        var y1 = Number(tar[0])
        var y2 = Number(tar[1])
        var sum = y1 + y2
        function check(l) {
            if (checked) {
                document.getElementById(l).innerHTML = "."
            } else {
                document.getElementById(l).innerHTML = ""
            }
        }
        if (y1 < y2) {
            y2 = y2 - y1
            y1 = y1 - y1
        } else {
            y1 = y1 - y2
            y2 = y2 - y2
        }

        for (let i = 0; i < 8; i++) {
            var n1 = (i + tar[1])
            check(n1)
            var n2 = tar[0] + i
            check(n2)

            if (y1 < 8 && y2 < 8) {
                var n3 = String(y1) + y2
                check(n3)
            }
            y1 = y1 + 1
            y2 = y2 + 1

            for (let j = 0; j < 8; j++) {
                var n4 = String(i) + j
                if (i + j == sum) {
                    check(n4)
                }
            }
            if (checked) {
                [n1, n2, n3, n4].map((item) => {
                    if (undo.includes(item)) {
                        cross(item, false)
                        setundo(prevItems => prevItems.filter(item2 => item2 !== item));
                        console.log(undo);
                    }
                })
               
                document.getElementById(tar).innerHTML = "&#9813;"
                // document.getElementById(tar).style.backgroundColor = 'purple'
            }

        }

    }
    return (
        <>
            <div className='w-full h-[100vh] bg-slate-800'>
                <h1 className='text-center text-white'>{8-undo.length} Queens left</h1>
                <div className='w-1/2 bg-white mx-auto flex flex-wrap'>
                    {
                        Array(8).fill().map((_, i) => {
                            return (
                                Array(8).fill().map((_, j) => {
                                    return (
                                        <div className={`bg-${i % 2 == 0 ? (j % 2 == 0 ? 'black' : 'white') : (j % 2 == 0 ? 'white' : 'black')} border border-gray-400 w-1/8 h-20 text-yellow-500 text-7xl text-center`}
                                            // key={}
                                            id={`${i}${j}`}
                                            onClick={(e) => putQueen(e)}
                                        >
                                            {/* {i}{j} */}
                                        </div>
                                    )
                                })
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ChessBoard
