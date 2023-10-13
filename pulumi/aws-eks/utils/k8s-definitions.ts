
import * as yaml from 'js-yaml';
import * as path from 'path';
import { readFileSync } from 'fs';


export const readK8sDefinition = (file: string): any => {
    return yaml.load(readFileSync(path.resolve(process.cwd(), '../..', 'k8s', file), 'utf-8'))
}