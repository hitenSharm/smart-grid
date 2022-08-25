import React from 'react'
import {useParams, Link} from 'react-router-dom';

export default function Auction() {

    const { id } = useParams();

  return (
    <div>{id}</div>
  )
}
