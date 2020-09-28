const users = [];

// Add user
const addUser = ({id, name, room}) => {

    // Remove spaces around
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existUser = users.find(user => user.name === name && user.room === room );
    
    if( existUser ) return { error: 'User has been taken' };

    
    const user = {id, name, room};

    users.push(user);

    return {user}

};


// Remove user
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    return users.splice(index, 1)[0];
};


// check user
const getUser = id => users.find(user => user.id === id);

// check room
const getUsersInRoom = room => users.filter(user => user.room === room);


module.exports = { addUser, removeUser, getUser, getUsersInRoom }