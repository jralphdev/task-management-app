const Statistics = () => {
  return (
    <section className='statistics'>
      <div className='stat-card'>
        <h2 className='stat-title'>Total Tasks</h2>
        <p className='stat-value text-green-400'>10</p>
      </div>

      <div className='stat-card'>
        <h2 className='stat-title'>Active</h2>
        <p className='stat-value text-blue-400'>5</p>
      </div>

      <div className='stat-card'>
        <h2 className='stat-title'>Inactive</h2>
        <p className='stat-value text-red-400'>5</p>
      </div>
    </section>
  );
};

export default Statistics;
