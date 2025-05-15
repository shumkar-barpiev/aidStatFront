"use client";

import React from "react";
import AvatarListItem from "@/components/statistics/components/avatars/AvatarListItem.tsx";

interface Props {
  items: {
    id: number;
    name: string;
    image: number;
  }[];
}

const AvatarList: React.FC<Props> = ({ items }) => (
  <>
    {items.map((item) => (
      <AvatarListItem key={item.id} item={item} />
    ))}
  </>
);

export default AvatarList;
