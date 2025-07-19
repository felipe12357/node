import { GitHubIssuePayload, GitHubStarPayLoad } from "../types";

export class GitHubWebHookService {
  constructor(){ }

  onStar( payload:GitHubStarPayLoad): string {
    let message:string;
    const { action, sender, repository } = payload;

    message = `User ${ sender.login} ${action} star on ${repository.full_name}`;
    
    return message;
  }

  onIssue( payload: GitHubIssuePayload): string {
    let message = 'unhandled action';

    const { action, issue } = payload;

    if( action === 'opened') {
      message = `An issue was opened with this title ${ issue.title}`;
    }

    if(action === 'closed') {
       message = `An issue was closed with this title ${ issue.title}`;
    }

    if(action === 'reopened') {
       message = `An issue was reopened with this title ${ issue.title}`;
    }

    return message;
  }
}
