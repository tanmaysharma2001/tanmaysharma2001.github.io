import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

/** 
 *  @type {import('rollup').RollupOptions}
*/

const obj = {
    input: 'src/main.ts',
    output: { file: 'bundle.js'},
    plugins: [
        nodeResolve(),
        typescript(),
        terser(),
    ]
}

export default obj;