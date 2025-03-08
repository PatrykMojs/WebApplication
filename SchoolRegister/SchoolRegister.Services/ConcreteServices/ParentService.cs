using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.Extensions.Logging;
using SchoolRegister.DAL.EF;
using SchoolRegister.Model.DataModels;
using SchoolRegister.ViewModels.VM;
using SchoolRegister.Services.Interfaces;

namespace SchoolRegister.Services.ConcreteServices
{
    public class ParentService : BaseService, IParentService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<ParentService> _logger;

        public ParentService(ApplicationDbContext dbContext, IMapper mapper, ILogger<ParentService> logger)
            : base(dbContext, mapper, logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public ParentVm GetParent(Expression<Func<Parent, bool>> filterPredicate)
        {
            var parent = _dbContext.Users.OfType<Parent>().FirstOrDefault(filterPredicate);
            return parent != null ? _mapper.Map<ParentVm>(parent) : null;
        }

        public IEnumerable<ParentVm> GetParents()
        {
            var parents = _dbContext.Users.OfType<Parent>().ToList();
            return _mapper.Map<IEnumerable<ParentVm>>(parents);
        }
    }
}
