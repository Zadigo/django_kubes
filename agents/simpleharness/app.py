import asyncio
import datetime
import json
import pathlib
from collections.abc import AsyncGenerator, Sequence

import aiofiles
import pydantic
import turboenv
import yaml
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
from playwright.async_api import async_playwright
from pydantic import Field

env = turboenv.TurboEnv()
env.load_envs(".env")

env.conditional("BASE_URL").depends_on(["DEEPSEEK_API_KEY", "OPEN_API_KEY"])

BASE_DIR: pathlib.Path = pathlib.Path(__file__).parent

SKILLS_DIRS: Sequence[pathlib.Path] = [BASE_DIR / ".agents"]

API_KEY = env.string("DEEPSEEK_API_KEY")
BASE_URL = env.url("BASE_URL", secured=True)


FILES_STATE: dict[str, datetime.datetime] = {}

SYSTEM_PROMPT = """
You are a weather expert. Answer questions about weather.

You can read and open files related to the weather.
"""

client = OpenAI(base_url=BASE_URL, api_key=API_KEY)


async def read_file(path: str) -> str:
    fullpath = BASE_DIR / path
    async with aiofiles.open(fullpath, mode="r") as f:
        content = await f.read()
    FILES_STATE[path] = datetime.datetime.now(tz=datetime.UTC)
    return content


async def write_file(path: str, content: str) -> None:
    fullpath = BASE_DIR / path
    async with aiofiles.open(fullpath, mode="w") as f:
        await f.write(content)
    FILES_STATE[path] = datetime.datetime.now(tz=datetime.UTC)
    return f"Wrote {path}"


async def open_browser():
    page_content: str = ''

    async with async_playwright() as context:
        browser = await context.chromium.launch()
        page = await browser.new_page()
        
        await page.goto("http://example.com")
        await page.wait_for_event("domcontentloaded", timeout=1000)
        
        page_content = await page.evaluate("document.body.innerText")

        await asyncio.sleep(5)
        await browser.close()
    return page_content


class Skill(pydantic.BaseModel):
    directory: str = Field(...)
    name: str = Field(...)
    path: pathlib.Path = Field(...)
    content: str = Field(...)


async def load_skills() -> AsyncGenerator[Skill]:
    for item in SKILLS_DIRS:
        for file in item.glob("*/SKILL.md"):
            text = file.read_text(encoding="utf-8")
            _, frontmatter = text.split("---", 2)
            yaml_data = yaml.safe_load(frontmatter)
            yield Skill(
                directory=str(item.parent),
                name=yaml_data.get("name"),
                description=" ".join(yaml_data.get("description", "").split()),
                path=file,
                content=text,
            )


async def call_tools(
    output: ChatCompletionMessageParam, messages: Sequence[ChatCompletionMessageParam]
):
    if output.tool_calls:
        messages.append(output)

        for tool_call in output.tool_calls:
            if tool_call.function.name == "read_file":
                func_args: dict = json.loads(tool_call.function.arguments)
                file_content = await read_file(func_args["path"])

                messages.append(
                    {
                        "role": "tool",
                        "content": file_content,
                        "name": "read_file",
                        "tool_call_id": tool_call.id,
                    }
                )

            if tool_call.function.name == 'open_browser':
                page_content = await open_browser()

                messages.append(
                    {
                        "role": "tool",
                        "content": page_content,
                        "name": "open_browser",
                        "tool_call_id": tool_call.id,
                    }
                )

        final_output = client.chat.completions.create(
            model="deepseek-flash", messages=messages
        )
        return final_output
    return output


async def main():
    while True:
        user_input = input("Ask something: ")

        messages: Sequence[ChatCompletionMessageParam] = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input},
        ]

        response = client.chat.completions.create(
            model="deepseek-flash",
            messages=messages,
            tools=[
                {
                    "type": "function",
                    "function": {
                        "name": "read_file",
                        "description": "Allows you to read files",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "path": {
                                    "type": "string",
                                    "description": "The file path to read",
                                }
                            },
                            "required": ["path"],
                        },
                    },
                },
                {
                    "type": "function",
                    "function": {
                        "name": "write_file",
                        "description": "Allows you to write files",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "path": {
                                    "type": "string",
                                    "description": "The file path to write",
                                },
                                "content": {
                                    "type": "string",
                                    "description": "The content to write",
                                }
                            },
                            "required": ["path"],
                        },
                    },
                },
                {
                    "type": "function",
                    "function": {
                        "name": "open_browser",
                        "description": "You can open a browser to a page",
                    },
                },
            ],
        )

        output = response.choices[0].message
        final_output = await call_tools(output, messages)
        print(final_output)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Exiting...")
