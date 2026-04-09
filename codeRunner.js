import vm from 'vm';

function deepEqual(a,b)
{
    if(a===b)
        return true;

    if(typeof a !== typeof b)
        return false;

    if(Array.isArray(a) && Array.isArray(b))
    {
        if(a.length !== b.length)
            return false;

        for(let i=0;i<a.length;i++)
        {
            if(!deepEqual(a[i], b[i]))
                return false;
        }
        return true;
    }
    return false;
}

export function runCode(userCode, question)
{
    const result = [];
    let passed = 0;

    for(const tc of question.testCases)
    {
        try
        {
            const args = tc.input.map(i => JSON.stringify(i)).join(', ');
            const wrappedCode = `
            ${userCode}
            __result__ = ${question.functionName}(${args});
            `;

            const ctx = vm.createContext({__result__: undefined});
            vm.runInContext(wrappedCode, ctx, {timeout: 2000});
            const isPassed = deepEqual(ctx.__result__, tc.expected);
            if(isPassed)
                passed++;
            result.push({passed: isPassed, output: ctx.__result__, expected: tc.expected});
        }
        catch(e)
        {
            result.push({passed: false, error: e.message});
        }
    }

    return{result, passed, total: question.testCases.length, allPassed: passed === question.testCases.length};
}