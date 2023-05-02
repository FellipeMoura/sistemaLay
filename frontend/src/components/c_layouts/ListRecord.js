import React from 'react';
import styles from './ListRecord.module.css';
 
function ListRecord({records,id}) {
    

    document.querySelectorAll("#idRecord").forEach( function(tr) {
    
        tr.addEventListener("click", function(event) {
        const el = event.target;
        id.setId(el.id);
        console.log("id:"+el.id)
        window.location.replace(`/prontuario/${el.id}`)

        });
    
    });
    const titulo = (records[0] ? <tr className={styles.thead}>
        <th className={styles.firstTd}>Paciente</th><th className={styles.secTd}>Data de ínício</th>
      </tr>: '' )

    return (
        <div className={styles.tableContainer}>
            <table >
            <thead>            
                    
                 {titulo}       
            </thead>
            <tbody className={styles.tbody}>
                {records.map(record => {
                    let inicion = record.inicio.substr(0, 10).split('-').reverse().join('/');
                    return (
                        <tr id="idRecord" key={record.id} className={styles.tbody}>
                        <td  id={record.id} className={styles.firstTd}>{record.name || '-'}</td>
                        <td className={styles.secTd}>{(inicion || '-')}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table> 
        </div> 
    );
}

 
export default ListRecord;