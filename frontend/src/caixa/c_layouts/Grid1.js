import React from "react";

export function Grid1({dataCards, titles}) {

    return (
        <div>
            <h1>start</h1>
            <table>
                <thead>
                    <tr>
                    {titles.map((title) =>
                        <th>{title}</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                {dataCards.map((dataCard) =>

                    <tr>
                    {Object.values(dataCard).map(column =>
                        Array.isArray(column) ?
                        ''
                        :
                        
                        <td>{column}</td> 
                    )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}