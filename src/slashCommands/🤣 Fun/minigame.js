const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    owner: false,
    premium: false,
    category: "fun",
    description: "🕹️ Play a minigame!",
    usage: "minigame <minigame>",
  },
  data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setDescription("🕹️ Play a minigame!")
    .setName("minigame")
    .setNSFW(false)
    .addSubcommand((subcommand) =>
      subcommand.setDescription("🕹️ Play a game of 2048!").setName("2048")
    )
    .addSubcommand((subcommand) =>
      subcommand.setDescription("🕹️ Play a game of wordle!").setName("wordle")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of trivia!")
        .setName("trivia")
        .addStringOption((option) =>
          option
            .setName("difficulty")
            .setDescription("The difficulty of the game!")
            .setRequired(true)
            .addChoices(
              { name: "easy", value: "easy" },
              { name: "medium", value: "medium" },
              { name: "hard", value: "hard" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setDescription("🕹️ Play a game of hangman!").setName("hangman")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of FastType!")
        .setName("fasttype")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("connect4")
        .setDescription("🕹️ Play a game of Connect 4!")
        .addUserOption((option) =>
          option
            .setDescription("The user to play against.")
            .setName("user")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Find Emoji!")
        .setName("emoji")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Flood!")
        .setName("flood")
        .addStringOption((option) =>
          option
            .setName("difficulty")
            .setDescription("The difficulty of the game!")
            .setRequired(true)
            .addChoices(
              { name: "easy", value: "easy" },
              { name: "medium", value: "medium" },
              { name: "hard", value: "hard" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Guess The Pokemon!")
        .setName("pokemon")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Match the Pairs!")
        .setName("match")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Minesweeper!")
        .setName("minesweeper")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Rock Paper Scissors!")
        .setName("rps")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to play against!")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setDescription("🕹️ Play a game of Snake!").setName("snake")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Tic Tac Toe!")
        .setName("tic-tac-toe")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to play against!")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setDescription("🕹️ Play a game of Would You Rather!")
        .setName("would-you-rather")
    ),

  async execute(interaction) {
    const gameType = interaction.options.getSubcommand();
    const {
      TwoZeroFourEight,
      Wordle,
      Trivia,
      Hangman,
      FastType,
      Connect4,
      FindEmoji,
      Flood,
      GuessThePokemon,
      MatchPairs,
      Minesweeper,
      RockPaperScissors,
      Snake,
      TicTacToe,
      WouldYouRather,
    } = require("discord-gamecord");

    if (gameType === "2048") {
      const Game = new TwoZeroFourEight({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "2048",
          color: "#5865F2",
        },
        emojis: {
          up: "⬆️",
          down: "⬇️",
          left: "⬅️",
          right: "➡️",
        },
        timeoutTime: 60000,
        buttonStyle: "PRIMARY",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "wordle") {
      const Game = new Wordle({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Wordle",
          color: "#5865F2",
        },
        customWord: null,
        timeoutTime: 120000,
        winMessage: "You won! The word was **{word}**.",
        loseMessage: "You lost! The word was **{word}**.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "trivia") {
      const difficulty = interaction.options.getString("difficulty");
      const Game = new Trivia({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: `Trivia (${
            difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
          })`,
          color: "#5865F2",
          description: "You have 60 seconds to guess the answer!",
        },
        timeoutTime: 60000,
        buttonStyle: "PRIMARY",
        trueButtonStyle: "SUCCESS",
        falseButtonStyle: "DANGER",
        mode: "multiple", // multiple || single
        difficulty: difficulty,
        winMessage: "You won! The correct answer is {answer}.",
        loseMessage: "You lost! The correct answer is {answer}.",
        errMessage: "Unable to fetch question data! Please try again.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", async (result) => {
        return;
      });
    } else if (gameType === "hangman") {
      const themes = [
        "nature",
        "sport",
        "color",
        "camp",
        "fruit",
        "discord",
        "winter",
        "pokemon",
      ];
      const theme = themes[Math.floor(Math.random() * themes.length)];

      const Game = new Hangman({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Hangman",
          color: "#5865F2",
        },
        hangman: {
          hat: "🎩",
          head: "😟",
          shirt: "👕",
          pants: "🩳",
          boots: "👞👞",
        },
        timeoutTime: 60000,
        theme: theme,
        winMessage: "You won! The word was **{word}**.",
        loseMessage: "You lost! The word was **{word}**.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "fasttype") {
      const { Sentence } = require("../../utils/sentences");
      const sentence = Sentence();

      const Game = new FastType({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Fast Type",
          color: "#5865F2",
          description: "You have {time} seconds to type the sentence below.",
        },
        timeoutTime: 60000,
        sentence: sentence,
        winMessage:
          "You won! You finished the type race in {time} seconds with wpm of {wpm}.",
        loseMessage: "You lost! You didn't type the correct sentence in time.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "connect4") {
      const opponent = interaction.options.getUser("user");
      const player = interaction.user;

      if (opponent.bot) {
        return interaction.reply({
          content: "You can't play against a bot!",
          ephemeral: true,
        });
      }

      if (opponent.id === player.id) {
        return interaction.reply({
          content: "You can't play against yourself!",
          ephemeral: true,
        });
      }

      const Game = new Connect4({
        message: interaction,
        isSlashGame: true,
        opponent: opponent,
        embed: {
          title: "Connect4 Game",
          statusTitle: "Status",
          color: "#5865F2",
        },
        emojis: {
          board: "⚪",
          player1: "🔴",
          player2: "🟡",
        },
        mentionUser: true,
        timeoutTime: 60000,
        buttonStyle: "PRIMARY",
        turnMessage: "{emoji} | Its turn of player **{player}**.",
        winMessage: "{emoji} | **{player}** won the Connect4 Game.",
        tieMessage: "The Game tied! No one won the Game!",
        timeoutMessage: "The Game went unfinished! No one won the Game!",
        playerOnlyMessage:
          "Only {player} and {opponent} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "emoji") {
      const Game = new FindEmoji({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Find Emoji",
          color: "#5865F2",
          description: "Remember the emojis from the board below.",
          findDescription: "Find the {emoji} emoji before the time runs out.",
        },
        timeoutTime: 60000,
        hideEmojiTime: 5000,
        buttonStyle: "PRIMARY",
        emojis: ["🍉", "🍇", "🍊", "🍋", "🥭", "🍎", "🍏", "🥝"],
        winMessage: "You won! You selected the correct emoji. {emoji}",
        loseMessage: "You lost! You selected the wrong emoji. {emoji}",
        timeoutMessage: "You lost! You ran out of time. The emoji is {emoji}",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "flood") {
      const { Flood } = require("discord-gamecord");
      const difficulty = interaction.options.getString("difficulty");
      difficultyValue = "";
      if (difficulty === "easy") {
        difficultyValue = 8;
      } else if (difficulty === "medium") {
        difficultyValue = 13;
      } else if (difficulty === "hard") {
        difficultyValue = 18;
      }

      const Game = new Flood({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Flood",
          color: "#5865F2",
        },
        difficulty: difficultyValue,
        timeoutTime: 60000,
        buttonStyle: "PRIMARY",
        emojis: ["🟥", "🟦", "🟧", "🟪", "🟩"],
        winMessage: "You won! You took **{turns}** turns.",
        loseMessage: "You lost! You took **{turns}** turns.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "pokemon") {
      const Game = new GuessThePokemon({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Who's The Pokemon",
          color: "#5865F2",
        },
        timeoutTime: 60000,
        winMessage: "You guessed it right! It was a {pokemon}.",
        loseMessage: "Better luck next time! It was a {pokemon}.",
        errMessage: "Unable to fetch pokemon data! Please try again.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "match") {
      const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Match Pairs",
          color: "#5865F2",
          description:
            "**Click on the buttons to match emojis with their pairs.**",
        },
        timeoutTime: 60000,
        emojis: [
          "🍉",
          "🍇",
          "🍊",
          "🥭",
          "🍎",
          "🍏",
          "🥝",
          "🥥",
          "🍓",
          "🫐",
          "🍍",
          "🥕",
          "🥔",
        ],
        winMessage:
          "**You won the Game! You turned a total of `{tilesTurned}` tiles.**",
        loseMessage:
          "**You lost the Game! You turned a total of `{tilesTurned}` tiles.**",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "minesweeper") {
      const Game = new Minesweeper({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Minesweeper",
          color: "#5865F2",
          description:
            "Click on the buttons to reveal the blocks except mines.",
        },
        emojis: { flag: "🚩", mine: "💣" },
        mines: 5,
        timeoutTime: 60000,
        winMessage: "You won the Game! You successfully avoided all the mines.",
        loseMessage: "You lost the Game! Beaware of the mines next time.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "rps") {
      const opponent = interaction.options.getUser("user");

      const Game = new RockPaperScissors({
        message: interaction,
        isSlashGame: true,
        opponent: opponent,
        embed: {
          title: "Rock Paper Scissors",
          color: "#5865F2",
          description: "Press a button below to make a choice.",
        },
        buttons: {
          rock: "Rock",
          paper: "Paper",
          scissors: "Scissors",
        },
        emojis: {
          rock: "🌑",
          paper: "📰",
          scissors: "✂️",
        },
        mentionUser: true,
        timeoutTime: 60000,
        buttonStyle: "PRIMARY",
        pickMessage: "You choose {emoji}.",
        winMessage: "**{player}** won the Game! Congratulations!",
        tieMessage: "The Game tied! No one won the Game!",
        timeoutMessage: "The Game went unfinished! No one won the Game!",
        playerOnlyMessage:
          "Only {player} and {opponent} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "snake") {
      const Game = new Snake({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Snake Game",
          overTitle: "Game Over",
          color: "#5865F2",
        },
        emojis: {
          board: "⬛",
          food: "🍎",
          up: "⬆️",
          down: "⬇️",
          left: "⬅️",
          right: "➡️",
        },
        snake: { head: "🟢", body: "🟩", tail: "🟢", skull: "💀" },
        foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
        stopButton: "Stop",
        timeoutTime: 60000,
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    } else if (gameType === "would-you-rather") {
      const Game = new WouldYouRather({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "Would You Rather",
          color: "#5865F2",
        },
        buttons: {
          option1: "Option 1",
          option2: "Option 2",
        },
        timeoutTime: 60000,
        errMessage: "Unable to fetch question data! Please try again.",
        playerOnlyMessage: "Only {player} can use these buttons.",
      });

      Game.startGame();
    } else if (gameType === "tic-tac-toe") {
      const opponent = interaction.options.getUser("user");

      const Game = new TicTacToe({
        message: interaction,
        isSlashGame: true,
        opponent: opponent,
        embed: {
          title: "Tic Tac Toe",
          color: "#5865F2",
          statusTitle: "Status",
          overTitle: "Game Over",
        },
        emojis: {
          xButton: "❌",
          oButton: "🔵",
          blankButton: "➖",
        },
        mentionUser: true,
        timeoutTime: 60000,
        xButtonStyle: "DANGER",
        oButtonStyle: "PRIMARY",
        turnMessage: "{emoji} | Its turn of player **{player}**.",
        winMessage: "{emoji} | **{player}** won the TicTacToe Game.",
        tieMessage: "The Game tied! No one won the Game!",
        timeoutMessage: "The Game went unfinished! No one won the Game!",
        playerOnlyMessage:
          "Only {player} and {opponent} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return;
      });
    }
  },
};
