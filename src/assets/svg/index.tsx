/* eslint-disable react/require-default-props */
import React, {CSSProperties} from 'react';
import About from './about.svg';
import Cart from './Cart.svg';
import Certificate from './certificate.svg';
import Share from './share.svg';
import User from './user.svg';
import Course from './courses.svg';
import Lock from './lock.svg';
import Email from './email.svg';
import Phone from './phone.svg';
import PlayVideo from './playVideo.svg';
import Achievement from './achievement.svg';
import PrevArrow from './prevArrow.svg';
import NextArrow from './nextArrow.svg';
import Dustbin from './dustbin.svg';
import Star from './star.svg';
import StarFilled from './starFilled.svg';
import UpArrow from './upArrow.svg';
import DownArrow from './DownArrow.svg';
import Info from './infoIcon.svg';
import Warning from './warning.svg';
import Users from './users.svg';
import Delete from './delete.svg';
import EmptyCart from './emptyCart.svg';
import BlueTick from './blue-tick.svg';
import BigLock from './bigLock.svg';
import Send from './sendIcon.svg';
import Logout from './logout.svg';

export interface ISVGProps {
  color?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
}
export function AboutIcon(props: ISVGProps) {
  return <About {...props} name="about" />;
}
export function CartIcon(props: ISVGProps) {
  return <Cart {...props} name="Cart" />;
}
export function CertificateIcon(props: ISVGProps) {
  return <Certificate {...props} name="certificate" />;
}
export function ShareIcon(props: ISVGProps) {
  return <Share {...props} name="share" />;
}
export function UserIcon(props: ISVGProps) {
  return <User {...props} name="user" />;
}
export function CourseIcon(props: ISVGProps) {
  return <Course {...props} name="courses" />;
}
export function LockIcon(props: ISVGProps) {
  return <Lock {...props} name="lock" />;
}
export function EmailIcon(props: ISVGProps) {
  return <Email {...props} name="email" />;
}
export function PhoneIcon(props: ISVGProps) {
  return <Phone {...props} name="phone" />;
}
export function PlayVideoIcon(props: ISVGProps) {
  return <PlayVideo {...props} name="playVideo" />;
}
export function AchievementIcon(props: ISVGProps) {
  return <Achievement {...props} name="achievement" />;
}
export function NextArrowIcon(props: ISVGProps) {
  return <NextArrow {...props} name="nextArrow" />;
}
export function PrevArrowIcon(props: ISVGProps) {
  return <PrevArrow {...props} name="prevArrow" />;
}
export function DustbinIcon(props: ISVGProps) {
  return <Dustbin {...props} name="prevArrow" />;
}
export function StarIcon(props: ISVGProps) {
  return <Star {...props} name="star" />;
}
export function StarFilledIcon(props: ISVGProps) {
  return <StarFilled {...props} name="star" />;
}
export function UpArrowIcon(props: ISVGProps) {
  return <UpArrow {...props} name="upArrow" />;
}
export function DownArrowIcon(props: ISVGProps) {
  return <DownArrow {...props} name="downArrow" />;
}
export function InfoIcon(props: ISVGProps) {
  return <Info {...props} name="infoIcon" />;
}
export function WarningIcon(props: ISVGProps) {
  return <Warning {...props} name="warningIcon" />;
}
export function UsersIcon(props: ISVGProps) {
  return <Users {...props} name="usersIcon" />;
}
export function DeleteIcon(props: ISVGProps) {
  return <Delete {...props} name="deleteIcon" />;
}
export function EmptyCartIcon(props: ISVGProps) {
  return <EmptyCart {...props} name="emptyCart" />;
}
export function BlueTickIcon(props: ISVGProps) {
  return <BlueTick {...props} name="blueTick" />;
}
export function BigLockIcon(props: ISVGProps) {
  return <BigLock {...props} name="bigLock" />;
}
export function SendIcon(props: ISVGProps) {
  return <Send {...props} name="sendIcon" />;
}
export function LogoutIcon(props: ISVGProps) {
  return <Logout {...props} name="logoutIcon" />;
}
