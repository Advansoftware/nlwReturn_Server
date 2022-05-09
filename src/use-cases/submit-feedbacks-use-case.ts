import { MailAdapter } from '../adpters/mail-adpter';
import { FeedbacksRepository } from '../repositories/feedbascks-repositories';

interface SubmitFeedbacksUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}
export class SubmitFeedbacksUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository, 
        private mailAdapter: MailAdapter,
    ) { }
    
    async execute(request: SubmitFeedbacksUseCaseRequest) {
        const { type, comment, screenshot } = request;
        
        await this.feedbacksRepository.create({
                type,
                comment,
                screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body:  [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${ type }</p>`,
                `<p>Comentario: ${ comment } <div /p>`,
                `</div>`
            ].join('\n')
        });
    
    }
}