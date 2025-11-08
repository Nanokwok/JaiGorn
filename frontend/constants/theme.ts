import { Platform } from 'react-native'

const tintColorLight = '#5DC270'
const tintColorDark = '#6FE482'

export const Colors = {
  light: {
    text: '#2C2C2C', // Dark grey for text
    background: '#F8F8F8', // Light grey background
    tint: tintColorLight, // Green accent
    icon: '#687076', // Default icon color (dark grey)
    tabIconDefault: '#687076', // Default tab icon
    tabIconSelected: tintColorLight, // Selected tab icon (green)

    // --- New Colors Added ---
    tintForeground: '#FFFFFF', // Text on top of the tint color (e.g., 'Pay' button)
    componentBackground: '#FFFFFF', // Background for cards, bills, etc.
    borderColor: '#EDEDED', // Border for transaction items
    secondaryText: '#A0A0A0', // For dates, subtitles, etc.
    shadow: '#000', // Shadow color
  },
  dark: {
    text: '#ECEDEE', // Light text for dark mode
    background: '#151718', // Dark background
    tint: tintColorDark, // Brighter green for dark mode contrast
    icon: '#9BA1A6', // Lighter default icon color
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // --- New Colors Added (Dark Mode) ---
    // --- THIS IS THE FIX ---
    tintForeground: '#151718', // Text on top of the tint color (WAS #FFFFFF)
    componentBackground: '#2C2C2C', // Dark background for cards
    borderColor: '#404040', // Dark border
    secondaryText: '#8E8E93', // Lighter grey for secondary text
    shadow: '#000', // Shadow color
  },
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
})
