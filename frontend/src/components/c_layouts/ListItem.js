import React from 'react';
import styles from './ListItem.module.css';
 
function ListItem({users, search}) {

    //const [id, setId] = useState('');
    

    document.querySelectorAll("#idUser").forEach( function(li) {
    
        li.addEventListener("click", function(event) {
        const el = event.target
        const key = event.target.value
        console.log(key)
        window.location.replace(`/prontuario/${key}/${el.className}/2`)

        });
    
    });

        
    return (
        
          
    search.length > 1 ? 
    <div className={styles.ulContainer}> 
  

            <ul className={styles.ulItem}>
                {users.map(user => {
                    return (
                        <li id="idUser"  value={user.iduser} key={user.iduser} className={user.id}>{user.name|| '?'}</li>
                    )
                })}
            </ul>
    </div>
    : '' 
          
            
    );
}
 
export default ListItem;