import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as FcIcons from 'react-icons/fc';


export const SidebarData = [
  {
    title: 'API Configuration',
    path: '/apiConfig',
    icon: <FcIcons.FcDataConfiguration />,
    cName: 'nav-text'
  },
  {
    title: 'Users Management',
    path: '/usersManagement',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Nightly Batch Process',
    path: '/nightlyBatchProcess',
    icon: <FcIcons.FcProcess color="white" />,
    cName: 'nav-text'
  }
];