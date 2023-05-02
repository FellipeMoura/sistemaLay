import React from 'react';
import styles from './ListItem.module.css';
 
function ListItem({users, search}) {

    //const [id, setId] = useState('');
    

    document.querySelectorAll("#idUser").forEach( function(tr) {
    
        tr.addEventListener("click", function(event) {
        const el = event.target;
        console.log(el)
       window.location.replace(`/prontuario/${el.id}/${el.className}/2`)

        });
    
    });

        
    return (
        
          
            search ? 
    <div className={styles.tableContainer}> 
        <span className={styles.space}>.</span>
        <table >
            <tbody className={styles.tbody}>
                {users.map(user => {
                    return (
                        <tr id="idUser" key={user.iduser}>
                        <td id={user.iduser} className={user.id}>{user.name || '-'}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>  
    </div>
    : '' 
          
            
    );
}
 
export default ListItem;