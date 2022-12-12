import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function AvatarImg(user) {
    let avatar;
    const userJson = JSON.parse(user.user);
    if(userJson._img_profile === null || userJson._img_profile === undefined){
        avatar = <Avatar {...stringAvatar(`${userJson._name} ${userJson._first_surname}`)} />
    }else{
        avatar = <Avatar alt="Remy Sharp" src={userJson.img_profile} />
    }
    return (
        <>
            <Typography > {userJson._name} {userJson._first_surname}</Typography>
            <Stack direction="row" sx={{ml:2}} spacing={2}>
            {avatar}
            </Stack>
        </>
    );
}