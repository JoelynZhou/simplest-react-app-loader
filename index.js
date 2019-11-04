// 引入必要的依赖
const commander = require("commander"); // 提no动生成帮助文本信息
const chalk = require("chalk"); // 修改控制台中字符串的样式（字体加粗，字体隐藏，字体颜色，背景颜色等）
const spawn = require("cross-spawn"); // 用于调用系统上的各种命令（调用 npm 等）
const fse = require("fs-extra"); // 是模块 fs（全称应该是 filesystem） 的扩展(替代品)，提供本地文件的读写能力
const path = require("path"); // 用于处理文件路径
const os = require("os"); // 一些基本的系统操作函数
const inquirer = require("inquirer");

const packageJson = require("./package.json");

let projectName; //项目名称，通过命令行里的参数获取

inquirer
  .prompt([
    {
      type: "confirm",
      name: "name",
      message: "Please enter a project name",
      default: ""
    }
  ])
  .then(data => {
    console.log("结果为:");
    console.log(data);
    projectName = data["name"];

    // 1. 通过 commander 获取项目名称
    const program = new commander.Command(packageJson.name)
      .version(packageJson.version)
      .arguments("<project-direactory>")
      .usage(`${chalk.green("<project-directory>")}`)
      .action(name => {
        projectName = name;
      })
      .parse(process.argv); // 格式化参数

    // 2. 检查项目名称是否为空，如果不为空，进入下一步；否则，退出进程
    console.log("projectName", projectName);
    if (typeof projectName === "undefined") {
      console.error("please specify the project directory");
      console.log();
      console.log("For examaple: ");
      console.log(
        `    ${chalk.cyan(program.name())} ${chalk.green("my-react-app")}`
      );
      console.log();
      process.exit(1); // 退出进程
    }

    // 在当前目录下创建一个以步骤 1 中设的项目名称为文件夹名的子目录，初始化一个 package.json 的文件
    createApp(projectName);

    function createApp(name) {
      const root = path.resolve(__dirname);
      console.log("root", root);
    }
  });
