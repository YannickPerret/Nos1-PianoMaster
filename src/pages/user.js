import React, { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import Menu from '../component/layout/menu';
import Headers from '../component/layout/header';
import SheetCards from '../component/sheets/sheetCards';
import userLists from '../helpers/users.json';
import SheetUserList from '../helpers/personnalSheet.json';
import sheetList from '../helpers/sheets.json';


const User = () => {
    const [user, setUser] = useState({});
    const [sheets, setSheets] = useState([]);

    let match = useMatch("users/:id") ? useMatch("users/:id").params.id : null;

    const navigation = useNavigate();

    const getUserById = (_userId) =>{
        let userTemps = false

        userLists.map(userTarget => {
            if(userTarget.id === Number(match)){
                userTemps = userTarget;
            }
        });

        return userTemps;
                
    }

    const getSheetsByUserId = (_userId) => {
        let sheetTemps = [];

        if(_userId){
            SheetUserList.map(sheetUser => {
                if(sheetUser.userId === Number(_userId)){
                    sheetUser.sheet.map(sheetUserElement => {
                        sheetList.map(sheetElement => {
                            if(sheetUserElement.sheetId === sheetElement.id){
                                sheetTemps = sheetTemps.concat({...sheetUserElement,...sheetElement})
                            }
                        })
                    })
                }
            })
            return sheetTemps
        }
            
        else return false
    }


    useEffect(() => {

        async function fetchData() {
            // You can await here
             await setUser(getUserById(match))

             await setSheets(getSheetsByUserId(match))

          }
          fetchData();
    }, [match])

    return (
        
        <>
            <Headers />
                {user ?(
                        <main className='user'>
                            <h2 className='user__title'>Profil Utilisateur</h2>
                            <div className='user__header'>
                                <img src={"../dist/avatar/"+user.avatarLocation} width="30%" height={'auto'}/>
                                <h2 className='user__header__username'>Bonjour {user.username}</h2>
                            </div>
                           
                            <div className='user__statistique'>
                                <h3>Statistiques</h3>
                                <div className='user__statistique__list'>
                                    <div className='user__statistique__list__items'><img src="../images/heart.svg" width={50} height={'auto'} alt="Partition liké"/><span>{user.likes}</span></div>
                                    <div className='user__statistique__list__items'><img src="../images/comments.svg" width={50} height={'auto'} alt="Commentaire postés"/><span>{user.comments}</span></div>
                                    <div className='user__statistique__list__items'><img src="../images/eye.svg" width={50} height={'auto'} alt="Vue totals des partitions" /><span>{user.totalViews}k</span></div>
                                </div>
                            </div>

                            <div className='user__sheetList'>
                                <h3>Dernière partitions joués</h3>
                                <div className='user__sheetList__list'>
                                    {sheets &&
                                        sheets.map(element => {
                                            return <SheetCards  sheetCard={element} key={element.id} />
                                        })
                                    }
        
                                </div>
                            </div>
                        </main>
                    ):
                    <div>Merci d'utiliser un profil utilisateur ! 
                        <br />
                        <Link to="/users/yannick" replace={true}>Cliquez ici</Link> pour utiliser le profils exemple
                    </div>
  
                }
            <Menu />
        </>
    );
};

export default User;