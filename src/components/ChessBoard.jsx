import React, { useState } from 'react'
function ChessBoard() {
    const [undo, setundo] = useState([])
    const [nValue, setnValue] = useState(8)
    function putQueen(e) {
        const data = e.target.id
        if (!undo.includes(data)) {
            setundo([...undo, data]);
            cross(data)
        } else {
            check(data)
        }
    }
    function check(l) {
        document.getElementById(l).innerHTML = ""
        const tmp = Number(l[0]) + Number(l[1])
        document.getElementById(l).style.backgroundColor = tmp % 2 == 0 ? 'black' : 'white';
    }
    function cross(id) {
        const tar = id;
        var y1 = Number(tar[0])
        var y2 = Number(tar[1])
        var sum = y1 + y2

        if (y1 < y2) {
            y2 = y2 - y1
            y1 = y1 - y1
        } else {
            y1 = y1 - y2
            y2 = y2 - y2
        }
        for (let i = 0; i < nValue; i++) {
            var v = (i + tar[1])
            var h = tar[0] + i
            if (y1 < nValue && y2 < nValue) {
                var d1 = String(y1) + y2
                y1++,y2++
            }
            var d2;
            for (let j = 0; j < nValue; j++) {
                if (i + j == sum) {
                    d2 = String(i) + j
                }
            }
            [v, h, d1, d2].map((item) => {
                if (undo.includes(item)) {
                    setundo(prevItems => prevItems.filter(item2 => item2 !== item));
                    check(item)
                }
            })
            document.getElementById(tar).innerHTML = "&#9813;"
            document.getElementById(tar).style.backgroundColor = 'purple'

        }
    }
    return (
        <>
            <div className='containe w-full  h-screen bg-slate-800 relative'>
                {/* <h1 className='text-center text-white'>{undo}</h1> */}
                <div className='text-yellow-500 flex justify-center w-1/2 mx-auto'>{
                    Array(nValue - undo.length).fill().map((_, i) => {
                        return (
                            <div key={i}>
                                <h1 className='text-5xl'>&#9813;</h1>
                                <h1 className='text-white text-center'>{i + 1}</h1>
                            </div>

                        )
                    })
                }</div>
                <div className='w-1/2 bg-white mx-auto flex flex-wrap' style={{ height: "42vw" }}>

                    {
                        Array(nValue).fill().map((_, i) => {
                            return (
                                Array(nValue).fill().map((_, j) => {
                                    const tmp = Number(String(i) + j)
                                    const size=(100/nValue) ;
                                    return (
                                        <div
                                            style={{ backgroundColor: (i + j) % 2 == 0 ? 'black' : 'white', height: size+'%' ,width:size+'%',fontSize:size*5 }}
                                            className={`cursor-pointer  text-yellow-500  justify-center  items-center flex`}
                                            key={tmp}
                                            id={`${i}${j}`}
                                            onClick={(e) => putQueen(e)}>
                                            {/* {i}{j} */}
                                        </div>
                                        // bg-${i % 2 == 0 ? (j % 2 == 0 ? 'black' : 'white') : (j % 2 == 0 ? 'white' : 'black')}
                                    )
                                })
                            )
                        })
                    }
                </div>

            </div >
        </>
    )
}

export default ChessBoard
