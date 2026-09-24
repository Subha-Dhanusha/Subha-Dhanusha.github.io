import { NextRequest, NextResponse } from 'next/server';
import {
  saveDomain,
  deleteDomain,
  saveProject,
  deleteProject,
  saveExperience,
  deleteExperience,
  saveSkill,
  deleteSkill,
  saveCertification,
  deleteCertification,
  saveAchievement,
  deleteAchievement,
  updateHeroSection,
  updateAboutSection,
  updateResume,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
  mutatePortfolioData,
} from '@/lib/data/portfolio-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    switch (action) {
      case 'SAVE_DOMAIN': {
        const res = await saveDomain(payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'DELETE_DOMAIN': {
        await deleteDomain(payload.id);
        return NextResponse.json({ success: true });
      }
      case 'SAVE_PROJECT': {
        const res = await saveProject(payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'DELETE_PROJECT': {
        await deleteProject(payload.id);
        return NextResponse.json({ success: true });
      }
      case 'SAVE_EXPERIENCE': {
        const res = await saveExperience(payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'DELETE_EXPERIENCE': {
        await deleteExperience(payload.id);
        return NextResponse.json({ success: true });
      }
      case 'SAVE_SKILL': {
        const res = await saveSkill(payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'DELETE_SKILL': {
        await deleteSkill(payload.id);
        return NextResponse.json({ success: true });
      }
      case 'SAVE_CERTIFICATION': {
        const res = await saveCertification(payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'DELETE_CERTIFICATION': {
        await deleteCertification(payload.id);
        return NextResponse.json({ success: true });
      }
      case 'SAVE_ACHIEVEMENT': {
        const res = await saveAchievement(payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'DELETE_ACHIEVEMENT': {
        await deleteAchievement(payload.id);
        return NextResponse.json({ success: true });
      }
      case 'UPDATE_HERO': {
        const res = await updateHeroSection(payload.domain_id, payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'UPDATE_ABOUT': {
        const res = await updateAboutSection(payload.domain_id, payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'UPDATE_RESUME': {
        const res = await updateResume(payload.domain_id, payload);
        return NextResponse.json({ success: true, data: res });
      }
      case 'GET_MESSAGES': {
        const res = await getContactMessages();
        return NextResponse.json({ success: true, data: res });
      }
      case 'UPDATE_MESSAGE_STATUS': {
        const res = await updateMessageStatus(payload.id, payload.updates);
        return NextResponse.json({ success: true, data: res });
      }
      case 'DELETE_MESSAGE': {
        const res = await deleteContactMessage(payload.id);
        return NextResponse.json({ success: true, data: res });
      }
      case 'UPDATE_SETTINGS': {
        await mutatePortfolioData(data => {
          data.settings = { ...data.settings, ...payload };
          return data;
        });
        return NextResponse.json({ success: true });
      }
      default:
        return NextResponse.json({ error: `Unknown mutation action: ${action}` }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Mutation failed' }, { status: 500 });
  }
}
