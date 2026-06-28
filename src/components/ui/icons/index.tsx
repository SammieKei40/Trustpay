/**
 * Icon system for Trustpay.
 *
 * HOW TO SWAP IN SVG ASSETS
 * --------------------------
 * 1. Drop your SVG file into assets/svgs/  (e.g. assets/svgs/send.svg)
 *    Make sure the SVG uses `currentColor` for stroke/fill so the `color` prop works:
 *      <path stroke="currentColor" ... />
 *
 * 2. Replace the inline <Svg> block inside the icon component with the asset import:
 *      import SendSvg from '../../../../assets/svgs/send.svg';
 *      export function SendIcon({ color = '#2667FF', size = 24 }: IconProps) {
 *        return <SendSvg width={size} height={size} color={color} />;
 *      }
 *
 * The color prop and hook below stay exactly the same — no other file needs to change.
 */

import React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useTheme } from "../../../context/ThemeContext";

// ─── Theme-aware color hook ───────────────────────────────────────────────────

export type IconColors = {
  /** Always brand-blue — for action icons on white/dark surfaces */
  primary: string;
  /** White — for icons sitting on the blue/dark header background */
  onHeader: string;
  /** Semi-transparent white — for secondary icons on the header */
  onHeaderMuted: string;
  /** Adapts fg colour — for icons on the main content area */
  default: string;
  /** Adapts muted fg — for secondary / decorative icons */
  muted: string;
};

export function useIconColors(): IconColors {
  const { isDark } = useTheme();
  return {
    primary:        "#2667FF",
    onHeader:       "#FFFFFF",
    onHeaderMuted:  "rgba(255,255,255,0.55)",
    default:        isDark ? "#FFFFFF" : "#0F172A",
    muted:          isDark ? "#757575" : "#BDBDBD",
  };
}

// ─── Shared prop type ─────────────────────────────────────────────────────────

export type IconProps = {
  color?: string;
  size?: number;
};

// ─── Header icons ─────────────────────────────────────────────────────────────
// These live on the coloured header; default colour is always white.
// Swap body → import BellSvg from '../../../../assets/svgs/bell.svg'

export function BellIcon({ color = "#FFFFFF", size = 22 }: IconProps) {
  // import BellSvg from '../../../../assets/svgs/bell.svg';
  // return <BellSvg width={size} height={size} color={color} />;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function EyeOffIcon({ color = "rgba(255,255,255,0.55)", size = 22 }: IconProps) {
  // import EyeOffSvg from '../../../../assets/svgs/eye-off.svg';
  // return <EyeOffSvg width={size} height={size} color={color} />;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M1 1l22 22" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Quick-action icons ───────────────────────────────────────────────────────
// Default colour is always primary blue.
// Swap body → import SendSvg from '../../../../assets/svgs/send.svg'

export function SendIcon({ color = "#2667FF", size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M16.7704 24.4933C15.8608 24.5614 15.0132 24.2335 14.4068 23.6271C13.8627 23.408 10.8218 15.8789 10.4718 15.2744L16.2878 9.45845C16.6342 9.11197 16.628 8.5613 16.2878 8.22101C15.9413 7.87453 15.3968 7.87453 15.0503 8.22101L9.23436 14.037L1.79735 10.733C0.60942 10.2009 -0.0896967 9.03157 0.00928141 7.73224C0.114453 6.4391 0.99306 5.38731 2.24285 5.05321L20.693 0.103428C21.751 -0.174965 22.8462 0.115815 23.6196 0.889213C24.3868 1.65642 24.6775 2.75156 24.3991 3.80955L19.4494 22.2598C19.1153 23.5096 18.0635 24.3881 16.7704 24.4933Z"
        fill={color}
      />
    </Svg>
  );
}

export function RequestIcon({ color = "#2667FF", size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 22" fill="none">
      <Path
        d="M20.1289 7.84H16.8361C15.4137 7.84 14.5625 6.9888 14.5625 5.5664V2.2736C14.5625 0.8512 15.4137 0 16.8361 0H20.1289C21.5513 0 22.4025 0.8512 22.4025 2.2736V5.5664C22.4025 6.9888 21.5513 7.84 20.1289 7.84ZM20.3753 4.1328C20.2409 3.9984 20.0617 3.9312 19.8825 3.9312C19.7033 3.9312 19.5241 3.9984 19.3897 4.1328L19.1881 4.3344V1.8256C19.1881 1.4336 18.8745 1.12 18.4825 1.12C18.0905 1.12 17.7769 1.4336 17.7769 1.8256V4.3344L17.5753 4.1328C17.3065 3.864 16.8585 3.864 16.5897 4.1328C16.3209 4.4016 16.3209 4.8496 16.5897 5.1184L17.9897 6.5184C18.0457 6.5744 18.1241 6.6192 18.2025 6.6528C18.2249 6.664 18.2473 6.664 18.2697 6.6752C18.3257 6.6976 18.3817 6.7088 18.4489 6.7088H18.5161C18.5945 6.7088 18.6617 6.6976 18.7401 6.664H18.7625C18.8409 6.6304 18.9081 6.5856 18.9641 6.5296C18.9753 6.5184 18.9753 6.5184 18.9865 6.5184L20.3865 5.1184C20.6553 4.8496 20.6553 4.4016 20.3753 4.1328Z"
        fill={color}
      />
      <Path
        d="M0 10.8747V16.4747C0 19.0395 2.072 21.1115 4.6368 21.1115H17.7521C20.3169 21.1115 22.4001 19.0283 22.4001 16.4635V10.8747C22.4001 10.1243 21.7953 9.51953 21.0449 9.51953H1.3552C0.6048 9.51953 0 10.1243 0 10.8747ZM6.72 17.3595H4.48C4.0208 17.3595 3.64 16.9787 3.64 16.5195C3.64 16.0603 4.0208 15.6795 4.48 15.6795H6.72C7.1792 15.6795 7.56 16.0603 7.56 16.5195C7.56 16.9787 7.1792 17.3595 6.72 17.3595ZM14.0001 17.3595H9.52006C9.06086 17.3595 8.68 16.9787 8.68 16.5195C8.68 16.0603 9.06086 15.6795 9.52006 15.6795H14.0001C14.4593 15.6795 14.8401 16.0603 14.8401 16.5195C14.8401 16.9787 14.4593 17.3595 14.0001 17.3595Z"
        fill={color}
      />
      <Path
        d="M12.8801 3.20286V6.48446C12.8801 7.23486 12.2753 7.83966 11.5249 7.83966H1.3552C0.5936 7.83966 0 7.21246 0 6.46206C0.0112 5.19646 0.5152 4.04286 1.3552 3.20286C2.1952 2.36286 3.36 1.84766 4.6368 1.84766H11.5249C12.2753 1.84766 12.8801 2.45246 12.8801 3.20286Z"
        fill={color}
      />
    </Svg>
  );
}

export function TopUpIcon({ color = "#2667FF", size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M4.66667 14.7607C2.08833 14.7607 0 16.8491 0 19.4274C0 20.3024 0.245 21.1307 0.676667 21.8307C1.48167 23.1841 2.96333 24.0941 4.66667 24.0941C6.37 24.0941 7.85167 23.1841 8.65667 21.8307C9.08833 21.1307 9.33333 20.3024 9.33333 19.4274C9.33333 16.8491 7.245 14.7607 4.66667 14.7607ZM6.405 20.2791H5.54167V21.1891C5.54167 21.6674 5.145 22.0641 4.66667 22.0641C4.18833 22.0641 3.79167 21.6674 3.79167 21.1891V20.2791H2.92833C2.45 20.2791 2.05333 19.8824 2.05333 19.4041C2.05333 18.9257 2.45 18.5291 2.92833 18.5291H3.79167V17.7007C3.79167 17.2224 4.18833 16.8257 4.66667 16.8257C5.145 16.8257 5.54167 17.2224 5.54167 17.7007V18.5291H6.405C6.88333 18.5291 7.28 18.9257 7.28 19.4041C7.28 19.8824 6.895 20.2791 6.405 20.2791Z"
        fill={color}
      />
      <Path
        d="M23.9141 11.8447H20.9974C19.7141 11.8447 18.6641 12.8947 18.6641 14.1781C18.6641 15.4614 19.7141 16.5114 20.9974 16.5114H23.9141C24.2407 16.5114 24.4974 16.2547 24.4974 15.9281V12.4281C24.4974 12.1014 24.2407 11.8447 23.9141 11.8447Z"
        fill={color}
      />
      <Path
        d="M18.1194 3.56125C18.4694 3.89958 18.1778 4.42458 17.6878 4.42458L8.02772 4.41292C7.46772 4.41292 7.18772 3.73625 7.58439 3.33958L9.62605 1.28625C11.3528 -0.42875 14.1411 -0.42875 15.8678 1.28625L18.0728 3.51458C18.0844 3.52625 18.1078 3.54958 18.1194 3.56125Z"
        fill={color}
      />
      <Path
        d="M24.3502 19.0311C23.6385 21.4344 21.5852 22.9277 18.7852 22.9277H11.2019C10.7469 22.9277 10.4552 22.4261 10.6419 22.0061C10.9919 21.1894 11.2135 20.2677 11.2135 19.4277C11.2135 15.8927 8.33187 13.0111 4.79687 13.0111C3.91021 13.0111 3.04687 13.1977 2.25354 13.5477C1.82187 13.7344 1.29688 13.4427 1.29688 12.9761V11.2611C1.29688 8.08773 3.21021 5.87107 6.18521 5.49773C6.47687 5.45107 6.79187 5.42773 7.11854 5.42773H18.7852C19.0885 5.42773 19.3802 5.4394 19.6602 5.48607C22.0169 5.7544 23.7202 7.1894 24.3502 9.3244C24.4669 9.7094 24.1869 10.0944 23.7902 10.0944H21.1185C18.5869 10.0944 16.5802 12.4044 17.1285 15.0294C17.5135 16.9427 19.2869 18.2611 21.2352 18.2611H23.7902C24.1985 18.2611 24.4669 18.6577 24.3502 19.0311Z"
        fill={color}
      />
    </Svg>
  );
}

export function MoreIcon({ color = "#2667FF", size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M8.96875 1.75H5.25C4.32212 1.75123 3.4326 2.12037 2.77648 2.77648C2.12037 3.4326 1.75123 4.32212 1.75 5.25V8.96875C1.75123 9.89663 2.12038 10.7862 2.77649 11.4423C3.4326 12.0984 4.32212 12.4675 5.25 12.4688H12.0312C12.1472 12.4684 12.2583 12.4222 12.3402 12.3402C12.4222 12.2583 12.4684 12.1472 12.4688 12.0312V5.25C12.4675 4.32212 12.0984 3.4326 11.4423 2.77648C10.7862 2.12037 9.89663 1.75123 8.96875 1.75Z"
        fill={color}
      />
      <Path
        d="M12.0312 15.5312H5.25C4.32212 15.5325 3.4326 15.9016 2.77648 16.5577C2.12037 17.2138 1.75123 18.1034 1.75 19.0312V22.75C1.75123 23.6779 2.12038 24.5674 2.77649 25.2235C3.4326 25.8796 4.32212 26.2488 5.25 26.25H8.96875C9.89663 26.2488 10.7862 25.8796 11.4423 25.2235C12.0984 24.5674 12.4675 23.6779 12.4688 22.75V15.9688C12.4684 15.8528 12.4222 15.7417 12.3402 15.6598C12.2583 15.5778 12.1472 15.5316 12.0312 15.5312Z"
        fill={color}
      />
      <Path
        d="M20.8906 12.4688C23.8505 12.4688 26.25 10.0693 26.25 7.10938C26.25 4.14947 23.8505 1.75 20.8906 1.75C17.9307 1.75 15.5312 4.14947 15.5312 7.10938C15.5312 10.0693 17.9307 12.4688 20.8906 12.4688Z"
        fill={color}
      />
      <Path
        d="M22.75 15.5225H15.9688C15.8528 15.5228 15.7417 15.569 15.6598 15.651C15.5778 15.733 15.5316 15.844 15.5312 15.96V22.7412C15.5317 23.6693 15.9006 24.5593 16.5569 25.2155C17.2132 25.8718 18.1031 26.2407 19.0312 26.2412H22.75C23.6781 26.2407 24.5681 25.8718 25.2243 25.2155C25.8806 24.5593 26.2495 23.6693 26.25 22.7412V19.0225C26.2488 18.0946 25.8796 17.2051 25.2235 16.5489C24.5674 15.8928 23.6779 15.5237 22.75 15.5225Z"
        fill={color}
      />
    </Svg>
  );
}

// ─── Card decorative icons ────────────────────────────────────────────────────
// Fixed colours — not tied to light/dark theme.

export function ChipIcon() {
  // import ChipSvg from '../../../../assets/svgs/chip.svg';
  // return <ChipSvg width={36} height={26} />;
  return (
    <Svg width={36} height={26} viewBox="0 0 36 26" fill="none">
      <Rect x={0} y={0} width={36} height={26} rx={4} fill="#D4A94A" />
      <Rect x={12} y={0} width={1.5} height={26} fill="#B8842A" />
      <Rect x={22.5} y={0} width={1.5} height={26} fill="#B8842A" />
      <Rect x={0} y={9} width={36} height={1.5} fill="#B8842A" />
      <Rect x={0} y={15.5} width={36} height={1.5} fill="#B8842A" />
      <Rect x={12} y={9} width={11} height={8} rx={2} fill="#C9A04A" />
    </Svg>
  );
}

export function MastercardLogo() {
  // import MastercardSvg from '../../../../assets/svgs/mastercard.svg';
  // return <MastercardSvg width={50} height={32} />;
  return (
    <Svg width={50} height={32} viewBox="0 0 50 32" fill="none">
      <Circle cx={18} cy={16} r={16} fill="#EB001B" />
      <Circle cx={32} cy={16} r={16} fill="#F79E1B" fillOpacity={0.9} />
    </Svg>
  );
}

// ─── Brand / service logos ────────────────────────────────────────────────────
// Fixed multicolour branding — no theme variant.

export function SlackLogo() {
  // import SlackSvg from '../../../../assets/svgs/slack.svg';
  // return <SlackSvg width={24} height={24} />;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" fill="#E01E5A" />
      <Path d="M9 6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" fill="#36C5F0" />
      <Path d="M18 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2V9h2zm-1 0a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#2EB67D" />
      <Path d="M15 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#ECB22E" />
    </Svg>
  );
}

// ─── Tab Bar Icons ────────────────────────────────────────────────────────────
// color prop is injected by the tab bar (blue when active, gray when inactive).
// filled prop switches from stroke-only to filled+stroke for the active state.

export type TabIconProps = {
  color?: string;
  filled?: boolean;
};

export function TabHomeIcon({ color = "#9E9E9E", filled = false }: TabIconProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.0012 8.70977L13.6682 4.56177C13.2002 4.19768 12.6242 4 12.0312 4C11.4383 4 10.8623 4.19768 10.3942 4.56177L5.06025 8.70977C4.73969 8.95905 4.48034 9.2783 4.30201 9.64312C4.12367 10.0079 4.03106 10.4087 4.03125 10.8148V18.0148C4.03125 18.5452 4.24196 19.0539 4.61704 19.429C4.99211 19.8041 5.50082 20.0148 6.03125 20.0148H18.0312C18.5617 20.0148 19.0704 19.8041 19.4455 19.429C19.8205 19.0539 20.0312 18.5452 20.0312 18.0148V10.8148C20.0312 9.99177 19.6512 9.21477 19.0012 8.70977Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 15C13.79 16.333 10.208 16.333 8 15"
        stroke={filled ? "#fff" : color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabCardIcon({ color = "#9E9E9E", filled = false }: TabIconProps) {
  const inner = filled ? "#fff" : color;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 5H18C19.6569 5 21 6.34315 21 8V16C21 17.6569 19.6569 19 18 19H6C4.34315 19 3 17.6569 3 16V8C3 6.34315 4.34315 5 6 5Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 10H21"
        stroke={inner}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 15H7.01M11 15H13"
        stroke={inner}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabScanIcon({ color = "#FFFFFF" }: TabIconProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 17V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V17" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 12H19" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TabActivityIcon({ color = "#9E9E9E", filled = false }: TabIconProps) {
  const sw = filled ? 2 : 1.5;
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        d="M5.21875 13.2532L8.21188 9.36305L11.6261 12.045L14.5551 8.26465"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={17.9652}
        cy={2.6722}
        r={1.9222}
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={sw}
      />
      <Path
        d="M12.8965 1.5918H5.62872C2.61728 1.5918 0.75 3.72452 0.75 6.73596V14.8183C0.75 17.8298 2.58066 19.9534 5.62872 19.9534H14.2328C17.2443 19.9534 19.1116 17.8298 19.1116 14.8183V7.77944"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabProfileIcon({ color = "#9E9E9E", filled = false }: TabIconProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
