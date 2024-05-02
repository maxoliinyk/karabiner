import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "caps_lock",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      c: open("https://news.ycombinator.com"),
      y: open("https://youtube.com"),
      f: open("https://facebook.com"),
      m: open("https://messenger.com"),
      r: open("https://reddit.com"),
      l: open("https://www.last.fm/user/ooomaxx"),
    },
    // o = "Open" applications
    o: {
      a: app("Arc"),
      v: app("Visual Studio Code"),
      x: app("Xcode"),
      d: app("Discord"),
      e: app("Mail"),
      t: app("Telegram"),
      k: app("Kitty"),
      m: app("Messages"),
      f: app("Finder"),
      s: app("Spotify"),
      p: app("Music"),
      // b = "oBsidian"
      b: app("Obsidian"),
    },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      d: {
        description: "Window: Next display",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_control", "right_option", "right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      open_bracket: {
        to: [{ key_code: "rewind" }],
      },
      close_bracket: {
        to: [{ key_code: "fastforward" }],
      },
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      m: {
        to: [
          {
            key_code: "mute",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      // "D"o not disturb toggle
      d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle`),
    },

    // c = sCreenshot 😭
    c: {
      o: open("raycast://extensions/Aayush9029/cleanshotx/capture-text"),
      h: open(
        "raycast://extensions/Aayush9029/cleanshotx/toggle-desktop-icons"
      ),
      r: open("raycast://extensions/Aayush9029/cleanshotx/open-history"),
      s: open("raycast://extensions/Aayush9029/cleanshotx/scrolling-capture"),
    },

    // r = "Raycast"
    r: {
      spacebar: open("raycast://extensions/raycast/file-search/search-files"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      v: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      d: open("raycast://extensions/aelew/cobalt/index"),
      b: open("raycast://extensions/jomifepe/bitwarden/search"),
      t: open("raycast://extensions/gebeto/translate/quick-translate"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
