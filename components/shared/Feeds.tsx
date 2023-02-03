import React from 'react';
import styled from 'styled-components';
import VideoItem from '../items/VideoItem';

const SCFeedstWrapper = styled.div`
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: scroll;
`;

const Feeds = () => {
  const focusVideo = () => {
    const element = document.getElementById('targetVideo');
    element && element.focus();
  };

  React.useEffect(() => {
    focusVideo();
  }, []);
  return (
    <SCFeedstWrapper id="targetVideo">
      <VideoItem src="https://v16-webapp.tiktok.com/ea7bf45455df925d40cc7e3bc778128a/63dc24fa/video/tos/useast2a/tos-useast2a-pve-0037-aiso/f34a8226157242178efcbe7658625b8f/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2630&bt=1315&cs=0&ds=3&ft=4b~OyM3a8Zmo0zPBT64jVrEdPpWrKsdm&mime_type=video_mp4&qs=0&rc=Zjk6ZmZoNTVpaTg2NzpmO0BpanJ0OGQ6ZjpnZzMzZjgzM0AvNTU0MGBgNWIxXjJjLV9iYSMuZDJscjRnLl5gLS1kL2Nzcw%3D%3D&l=202302021502354735B0FD268DF2270798&btag=80000" />
      <VideoItem src="https://v16-webapp.tiktok.com/9e18ff2b0fc5afa68ae99607886f9a7f/63dc24f7/video/tos/maliva/tos-maliva-ve-0068c799-us/8ab49579b24249e89f6cf2fb5f7bc41e/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=5046&bt=2523&cs=0&ds=3&ft=4b~OyM3a8Zmo0zPBT64jVrEdPpWrKsdm&mime_type=video_mp4&qs=0&rc=NzppNzk7OWdmZTloaTU5OkBpajw6ajQ6ZnVwZzMzZzczNEAuYF8xNWAuXi4xYTIzLzZgYSNmXl9zcjQwaXFgLS1kMS9zcw%3D%3D&l=202302021502354735B0FD268DF2270798&btag=80000" />
      <VideoItem src="https://v16-webapp.tiktok.com/972ff9039665cdf3c657a49e4c5bc556/63dc24fc/video/tos/useast2a/tos-useast2a-pve-0037-aiso/ogjqeOMHoJREBzECQuGpgDAOgVeA0PbvwQZntD/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3360&bt=1680&cs=0&ds=3&ft=4b~OyM3a8Zmo0zPBT64jVrEdPpWrKsdm&mime_type=video_mp4&qs=0&rc=PGg4NWZpZzM3Nzs3Z2hoM0BpMzltODo6ZnVraDMzZjgzM0AzYWJjY182XjUxYjJjYzU0YSMuZ3EucjRnamhgLS1kL2Nzcw%3D%3D&l=202302021502354735B0FD268DF2270798&btag=80000" />
      <VideoItem src="https://v16-webapp.tiktok.com/899355b77da40107be4ab9e8e7143c3a/63dcc87f/video/tos/useast2a/tos-useast2a-pve-0037-aiso/198e8f0cb89b4e2ca9936081a6c7cfb7/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=4894&bt=2447&cs=0&ds=3&ft=4b~OyM3a8Zmo0a-Ji64jVs4rjpWrKsdm&mime_type=video_mp4&qs=0&rc=N2U4NDZnODs7aTg4aWc3aEBpamU1aTg6ZjtlZzMzZjgzM0BeYTYvYGItX18xYDMxLTE1YSNkNTRjcjRvYGpgLS1kL2Nzcw%3D%3D&l=20230203023934F7365E94EACB3E608034&btag=80000" />
    </SCFeedstWrapper>
  );
};

export default Feeds;
