import React, { useEffect, useState } from 'react'

function GridLights({ size }: {
    size: number
}): React.ReactNode {
    const TIMEOUT = 300;
    const newArray = Array(size * size).fill(0)
    if (size % 2 === 0) {
        return <div>
            Size should be an odd number
        </div>
    }
    const divToHide: number = Math.floor(newArray.length / 2)
    const [lightsOn, setLightsOn] = useState<number[]>([])

    const handleBoxClick: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent) => {
        const target: HTMLDivElement = e?.target as HTMLDivElement;
        const boxId: number = Number(target.dataset?.boxId);
        if (boxId !== divToHide && lightsOn.indexOf(boxId) < 0) {
            setLightsOn(prevdata => {
                return [
                    ...prevdata,
                    boxId
                ]
            })
        }
    }

    useEffect(() => {
        let interval: number | undefined;
        if (lightsOn.length >= newArray.length - 1) {
            interval = setInterval(() => {
                lightsOn.pop();
                setLightsOn([...lightsOn])
                if (lightsOn.length === 0) {
                    clearInterval(interval)
                }
            }, TIMEOUT)
        }


    }, [lightsOn])


    return (
        <div className='grid-container'>
            {
                newArray.map((_, idx) => {
                    return (
                        <div key={idx} onClick={handleBoxClick} data-box-id={idx} className={`grid-items ${divToHide === idx ? "not-visible" : ""} ${lightsOn.includes(idx) ? "green-box" : ""}`}>

                        </div>
                    )
                })
            }

        </div>
    )
}

export default GridLights
