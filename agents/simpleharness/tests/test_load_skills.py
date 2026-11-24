from app import load_skills


async def test_load_skills():
    async for skill in load_skills():
        assert skill.name is not None
        # assert skill.content is not None
        # assert hasattr(skill.content, "__aiter__")
