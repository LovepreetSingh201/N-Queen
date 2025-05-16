import React, { useEffect, useState } from 'react'
function ChessBoard() {
    const [undo, setundo] = useState([])
    const [nValue, setnValue] = useState(4)
    useEffect(() => { 
      clearBoard()
    }, [nValue])
    function clearBoard() {
        console.log(undo.length);
        setundo("")
        const boxes=document.querySelectorAll('.chessBox')
        boxes.forEach((element)=>{
            check(element.id)
        })
    }
    
    function putQueen(e) {
        const data = e.target.id
        
        if (!undo.includes(data)) {
            setundo([...undo, data]);
            cross(data)
        } else {
            check(data)
            setundo(prevItems => prevItems.filter(item => item !== data));
        }
    }
    function check(l) {
        document.getElementById(l).innerHTML = ""
        const tmp=l.split("/")
        const tmp2 = Number(tmp[0])+Number(tmp[1])
        document.getElementById(l).style.backgroundColor = tmp2 % 2 == 0 ? 'black' : 'white';
    }
    function cross(id) {
        const tmp=id.split("/")
        const tar = [tmp[0],tmp[1] ]
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
            var v = (i +"/"+ tar[1])
            var h = tar[0] +"/"+ i
            if (y1 < nValue && y2 < nValue) {
                var d1 = String(y1)+"/" + y2
                y1++, y2++
            }
            var d2;
            for (let j = 0; j < nValue; j++) {
                if (i + j == sum) {
                    d2 = String(i)+"/" + j
                }
            }
            // console.log(v, h, d1, d2);
            [v, h, d1, d2].map((item) => {
                if (undo.includes(item)) {
                    setundo(prevItems => prevItems.filter(item2 => item2 !== item));
                    check(item)
                }
            })
            document.getElementById(id).innerHTML = "&#9813;"
            document.getElementById(id).style.backgroundColor = 'purple'

        }
    }
    return (
        <>
            <div className='contai w-full  h-lvh bg-slate-800 relative'>
                <div className='text-yellow-500 mx-auto w-1/2  relative'>
                    <div className='flex gap-1 absolute -left-35 top-1/4' >
                        <button className='bg-slate-900 px-3 pb-1 rounded-md text-white text-xl' onClick={() => setnValue(nValue>2? nValue - 1 :nValue)} >-</button>
                        <h1 className='bg-white rounded-md text-black px-3 font-bold pt-1'>{nValue}X{nValue}</h1>
                        <button className='bg-slate-900 px-3 pb-1 rounded-md text-white text-xl' onClick={() => setnValue(nValue<20?nValue + 1:nValue)}>+</button>
                    </div>
                    <div className='flex w-full items-center h-18'>
                        {   
                            undo.length>=0?
                            Array(nValue - undo.length).fill().map((_, i) => {
                                return (
                                    <div key={i} style={{width:100/nValue+'%'}}>
                                        <h1 className='text-5xl text-center'>&#9813;</h1>
                                        {/* <h1 className='text-5xl h-10'></h1> */}
                                        {/* <h1 className='-mt-2 text-white text-center'>{i + 1}</h1> */}
                                    </div>
                                )
                            })
                            :"ee"
                        }
                    </div>
                </div>
                <div className='w-1/2 mx-auto flex flex-wrap' style={{ height: "42vw" }}>
                    {
                        Array(nValue).fill().map((_, i) => {
                            return (
                                Array(nValue).fill().map((_, j) => {
                                    const tmp = Number(String(i) + j)
                                    const size = (100 / nValue);
                                    return (
                                        <div
                                            style={{ backgroundColor: (i + j) % 2 == 0 ? 'black' : 'white', height: size + '%', width: size + '%', fontSize: size*30+'%' }}
                                            className={`cursor-pointer  text-yellow-500  justify-center  items-center flex chessBox`}
                                            key={tmp}
                                            id={`${i}/${j}`}
                                            onClick={(e) => putQueen(e)}>
                                            {/* {i+j} */}
                                        </div>
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
