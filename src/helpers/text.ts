export function htmlToPlainText(input: string)
{
    return input.replace(/<br>/g, "\n");
}